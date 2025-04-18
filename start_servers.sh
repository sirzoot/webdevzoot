#!/bin/bash
# Run this script to start both the backend and frontend servers

# Start the backend server
echo "Starting Python backend server..."
cd /home/ubuntu/larry-website-backend
python3 app.py &
BACKEND_PID=$!

# Wait for backend to initialize
sleep 2
echo "Backend server started with PID: $BACKEND_PID"

# Start the frontend development server
echo "Starting React frontend server..."
cd /home/ubuntu/larry-website
npm start &
FRONTEND_PID=$!

echo "Frontend server started with PID: $FRONTEND_PID"
echo "Both servers are now running."
echo "Access the frontend at: http://localhost:3000"
echo "Access the backend API at: http://localhost:5000"
echo ""
echo "Press Ctrl+C to stop both servers."

# Handle cleanup on script termination
trap "echo 'Stopping servers...'; kill $BACKEND_PID $FRONTEND_PID; exit" INT TERM EXIT

# Keep script running
wait
