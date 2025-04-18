# Larry Website - README

## Project Overview
This project is a modern website built with a React frontend and Python backend. The website features fluid animations, interactive elements, and a responsive design as specified in the requirements.

## Features
- Modern, responsive design with Tailwind CSS
- Interactive animations using Framer Motion and GSAP
- Custom cursor effects
- Gallery with filtering capabilities
- Contact form with backend integration
- Mobile-friendly navigation

## Project Structure
The project consists of two main parts:

### Frontend (React)
Located in the `/larry-website` directory:
- Modern React application created with create-react-app
- Uses Tailwind CSS for styling
- Framer Motion and GSAP for animations
- React Router for navigation
- Axios for API requests

### Backend (Python Flask)
Located in the `/larry-website-backend` directory:
- Flask API with Blueprint organization
- Contact form handling with validation
- Simple JSON file-based storage for messages
- CORS support for frontend integration

## Getting Started

### Prerequisites
- Node.js (v14+)
- npm or yarn
- Python 3.6+
- pip

### Installation

#### Backend Setup
1. Navigate to the backend directory:
   ```
   cd larry-website-backend
   ```

2. Install dependencies:
   ```
   pip install flask flask-cors python-dotenv
   ```

3. Start the backend server:
   ```
   python app.py
   ```
   The server will run on http://localhost:5000

#### Frontend Setup
1. Navigate to the frontend directory:
   ```
   cd larry-website
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```
   The application will open in your browser at http://localhost:3000

### Quick Start
You can use the provided script to start both servers at once:
```
./start_servers.sh
```

## Testing
To test the application, you can use the provided test script:
```
./test_application.py
```
This script will:
1. Start both the frontend and backend servers
2. Test the backend health endpoint
3. Test the contact form API
4. Check if the frontend is accessible
5. Open the frontend in a browser for manual testing

## Pages
The website consists of three main pages:

1. **Home Page**: Features an animated hero section, about section, services section, and call-to-action.
2. **Gallery Page**: Displays a filterable gallery of projects.
3. **Contact Page**: Contains a contact form that sends data to the backend API.

## Customization
- Colors and theme settings can be modified in `tailwind.config.js`
- Main CSS styles are in `src/index.css`
- Backend configuration can be adjusted in the `.env` file

## Deployment
For production deployment:

### Frontend
Build the React application:
```
cd larry-website
npm run build
```
The build files will be in the `build` directory, ready to be served by any static file server.

### Backend
The Flask application can be deployed using WSGI servers like Gunicorn or uWSGI, or platforms like Heroku or AWS.

## License
This project is licensed under the MIT License.
