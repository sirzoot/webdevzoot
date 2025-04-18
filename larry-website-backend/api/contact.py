"""
Contact form handling module for the Larry Website backend.
This module provides functions for validating and processing contact form submissions.
"""
import re
import json
import os
from datetime import datetime

MESSAGES_FILE = 'messages.json'

def validate_email(email):
    """Validate email format."""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

def validate_contact_form(data):
    """Validate contact form data."""
    errors = {}
    
    # Check required fields
    required_fields = ['name', 'email', 'subject', 'message']
    for field in required_fields:
        if field not in data or not data[field].strip():
            errors[field] = f"{field.capitalize()} is required"
    
    # Validate email format
    if 'email' in data and data['email'].strip() and not validate_email(data['email']):
        errors['email'] = "Invalid email format"
    
    # Validate message length
    if 'message' in data and len(data['message']) < 10:
        errors['message'] = "Message must be at least 10 characters long"
    
    return errors

def process_contact_form(data):
    """Process contact form submission."""
    # Validate form data
    errors = validate_contact_form(data)
    if errors:
        return {"success": False, "errors": errors}, 400
    
    # Create message object
    message = {
        "id": len(load_messages()) + 1,
        "name": data['name'],
        "email": data['email'],
        "subject": data['subject'],
        "message": data['message'],
        "timestamp": datetime.now().isoformat(),
        "status": "unread"
    }
    
    # Save message
    save_message(message)
    
    # In a real application, you might send an email notification here
    
    return {"success": True, "message": "Message received successfully"}, 200

def load_messages():
    """Load messages from file."""
    if os.path.exists(MESSAGES_FILE):
        with open(MESSAGES_FILE, 'r') as f:
            return json.load(f)
    return []

def save_message(message):
    """Save message to file."""
    messages = load_messages()
    messages.append(message)
    with open(MESSAGES_FILE, 'w') as f:
        json.dump(messages, f, indent=2)
