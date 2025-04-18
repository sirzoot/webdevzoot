#!/usr/bin/env python3
"""
Test script for Larry Website application.
This script tests both the frontend and backend components.
"""
import os
import sys
import json
import requests
import time
import subprocess
import signal
import webbrowser
from datetime import datetime

# Configuration
BACKEND_DIR = "/home/ubuntu/larry-website-backend"
FRONTEND_DIR = "/home/ubuntu/larry-website"
BACKEND_URL = "http://localhost:5000"
FRONTEND_URL = "http://localhost:3000"

# Test data
TEST_CONTACT_DATA = {
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test Message",
    "message": "This is a test message from the automated test script."
}

def print_header(message):
    """Print a formatted header message."""
    print("\n" + "=" * 80)
    print(f" {message} ".center(80, "="))
    print("=" * 80)

def print_result(test_name, success):
    """Print a formatted test result."""
    result = "✅ PASSED" if success else "❌ FAILED"
    print(f"{test_name}: {result}")

def start_backend():
    """Start the backend server."""
    print_header("Starting Backend Server")
    os.chdir(BACKEND_DIR)
    process = subprocess.Popen(["python3", "app.py"], 
                              stdout=subprocess.PIPE,
                              stderr=subprocess.PIPE)
    # Give the server time to start
    time.sleep(2)
    return process

def start_frontend():
    """Start the frontend development server."""
    print_header("Starting Frontend Server")
    os.chdir(FRONTEND_DIR)
    process = subprocess.Popen(["npm", "start"], 
                              stdout=subprocess.PIPE,
                              stderr=subprocess.PIPE)
    # Give the server time to start
    time.sleep(5)
    return process

def test_backend_health():
    """Test the backend health endpoint."""
    print_header("Testing Backend Health")
    try:
        response = requests.get(f"{BACKEND_URL}/api/health")
        success = response.status_code == 200 and response.json().get("status") == "healthy"
        print_result("Backend Health Check", success)
        return success
    except requests.RequestException as e:
        print(f"Error connecting to backend: {e}")
        print_result("Backend Health Check", False)
        return False

def test_contact_form():
    """Test the contact form API endpoint."""
    print_header("Testing Contact Form API")
    try:
        response = requests.post(
            f"{BACKEND_URL}/api/contact",
            json=TEST_CONTACT_DATA
        )
        success = response.status_code == 200 and response.json().get("success") == True
        print_result("Contact Form Submission", success)
        
        # Check if message was saved
        messages_response = requests.get(f"{BACKEND_URL}/api/messages")
        messages = messages_response.json().get("messages", [])
        message_found = any(
            msg.get("email") == TEST_CONTACT_DATA["email"] and 
            msg.get("subject") == TEST_CONTACT_DATA["subject"]
            for msg in messages
        )
        print_result("Message Storage", message_found)
        
        return success and message_found
    except requests.RequestException as e:
        print(f"Error testing contact form: {e}")
        print_result("Contact Form API", False)
        return False

def test_frontend_access():
    """Test if the frontend is accessible."""
    print_header("Testing Frontend Access")
    try:
        response = requests.get(FRONTEND_URL)
        success = response.status_code == 200
        print_result("Frontend Access", success)
        return success
    except requests.RequestException as e:
        print(f"Error connecting to frontend: {e}")
        print_result("Frontend Access", False)
        return False

def open_in_browser():
    """Open the frontend in a browser for manual testing."""
    print_header("Opening Frontend in Browser")
    print("The frontend will open in your browser for manual testing.")
    print("Please check the following:")
    print("1. Home page animations and layout")
    print("2. Gallery page filtering and interactions")
    print("3. Contact form validation and submission")
    print("4. Responsive design on different viewport sizes")
    print("5. Navigation and overall user experience")
    
    try:
        webbrowser.open(FRONTEND_URL)
        return True
    except Exception as e:
        print(f"Error opening browser: {e}")
        return False

def cleanup(backend_process, frontend_process):
    """Clean up processes on exit."""
    print_header("Cleaning Up")
    
    if backend_process:
        print("Stopping backend server...")
        backend_process.terminate()
        backend_process.wait()
    
    if frontend_process:
        print("Stopping frontend server...")
        frontend_process.terminate()
        frontend_process.wait()

def main():
    """Main test function."""
    print_header("Larry Website Application Test")
    print(f"Test started at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    backend_process = None
    frontend_process = None
    
    try:
        # Start servers
        backend_process = start_backend()
        frontend_process = start_frontend()
        
        # Run tests
        backend_health = test_backend_health()
        contact_form = test_backend_health() and test_contact_form()
        frontend_access = test_frontend_access()
        
        # Summary
        print_header("Test Summary")
        print_result("Backend Health", backend_health)
        print_result("Contact Form API", contact_form)
        print_result("Frontend Access", frontend_access)
        
        overall_success = backend_health and contact_form and frontend_access
        print_result("Overall Test", overall_success)
        
        if overall_success:
            print("\nAll automated tests passed!")
            print("Opening frontend for manual testing...")
            open_in_browser()
            
            print("\nPress Enter to exit and stop the servers...")
            input()
        
    except KeyboardInterrupt:
        print("\nTest interrupted by user.")
    finally:
        cleanup(backend_process, frontend_process)
        print("Test completed.")

if __name__ == "__main__":
    main()
