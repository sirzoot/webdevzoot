"""
Main application module for the Larry Website backend.
This module initializes the Flask application and serves as the entry point.
"""
from flask import Flask, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
from api.routes import api

# Load environment variables
load_dotenv()

def create_app():
    """Create and configure the Flask application."""
    app = Flask(__name__)
    CORS(app)  # Enable CORS for all routes
    
    # Register blueprints
    app.register_blueprint(api, url_prefix='/api')
    
    @app.route('/')
    def index():
        """Root endpoint to check if API is running."""
        return jsonify({"status": "API is running"})
    
    return app

if __name__ == '__main__':
    app = create_app()
    
    # Get port from environment variable or use default
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
