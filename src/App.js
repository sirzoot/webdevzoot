import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [isDesktop, setIsDesktop] = useState(false);
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check
    
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
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Router>
      <div className="App min-h-screen bg-background text-text">
        {isDesktop && <Cursor position={cursorPosition} />}
        <Navbar />
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col min-h-screen"
          >
            {apiStatus.checked && !apiStatus.healthy && (
              <div className="bg-red-900/80 text-white text-center py-2 px-4">
                <p>API connection issue. Some features may not work properly.</p>
              </div>
            )}
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/contact" element={<ContactPage />} />
              </Routes>
            </main>
            <Footer />
          </motion.div>
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;
