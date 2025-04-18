from flask import Blueprint, jsonify, request
import os
from .contact import process_contact_form, load_messages

api = Blueprint('api', __name__)

# Ensure messages file exists
MESSAGES_FILE = 'messages.json'
if not os.path.exists(MESSAGES_FILE):
    with open(MESSAGES_FILE, 'w') as f:
        f.write('[]')

@api.route('/contact', methods=['POST'])
def contact():
    """Handle contact form submissions."""
    data = request.json
    response, status_code = process_contact_form(data)
    return jsonify(response), status_code

@api.route('/messages', methods=['GET'])
def get_messages():
    """Retrieve all messages (would be protected in production)."""
    # In a real application, this would be protected with authentication
    messages = load_messages()
    return jsonify({"success": True, "messages": messages})

@api.route('/health', methods=['GET'])
def health_check():
    """API health check endpoint."""
    return jsonify({"status": "healthy", "version": "1.0.0"})
