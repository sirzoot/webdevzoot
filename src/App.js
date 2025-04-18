import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import HomePage from './pages/HomePage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Cursor from './components/Cursor';
import { checkApiHealth } from './services/api';

function App() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [apiStatus, setApiStatus] = useState({ checked: false, healthy: false });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Check API health on component mount
    const checkHealth = async () => {
      try {
        const health = await checkApiHealth();
        setApiStatus({ 
          checked: true, 
          healthy: health.status === 'healthy' 
        });
      } catch (error) {
        setApiStatus({ checked: true, healthy: false });
        console.error('API health check failed:', error);
      }
    };
    
    checkHealth();
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <Router>
      <div className="App relative min-h-screen bg-primary text-white">
        <Cursor position={cursorPosition} />
        <Navbar />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {apiStatus.checked && !apiStatus.healthy && (
            <div className="bg-red-900/80 text-white text-center py-2 px-4">
              <p>API connection issue. Some features may not work properly.</p>
            </div>
          )}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </motion.div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
