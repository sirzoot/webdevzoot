import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const navigate = useNavigate();
  
  // Loading animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleCTAClick = (type) => {
    if (type === 'buy') {
      navigate('/listings');
    } else {
      setModalType(type);
      setShowModal(true);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen bg-primary text-white">
      {/* Loading Animation */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-primary z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <img src="/logo512.png" alt="Showcase Logo" className="w-32 h-32 mx-auto mb-4" />
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-2xl font-bold"
              >
                Showcase Real Estate
              </motion.h1>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/50" />
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">Your Home, Showcased to Perfection</h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto">
              Experience the future of real estate with our innovative approach to buying and selling homes.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap justify-center gap-4"
          >
            {[
              { label: 'Buy', type: 'buy' },
              { label: 'Sell', type: 'sell' },
              { label: 'Get Estimate', type: 'estimate' }
            ].map((button, index) => (
              <motion.button
                key={index}
                variants={itemVariants}
                onClick={() => handleCTAClick(button.type)}
                className="px-8 py-4 bg-accent hover:bg-accent/80 text-white rounded-lg font-semibold transition-colors duration-300"
              >
                {button.label}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="py-20 bg-primary">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
          >
            {[
              { number: '500+', label: 'Homes Sold' },
              { number: '15+', label: 'Years in Business' },
              { number: '30', label: 'Avg. Days on Market' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-8 bg-primary/50 rounded-lg border border-gray-800"
              >
                <h3 className="text-4xl font-bold mb-2">{stat.number}</h3>
                <p className="text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Listings Section */}
      <section className="py-20 bg-primary/80">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Listings</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Discover our latest premium properties that combine luxury, comfort, and prime locations.
            </p>
          </motion.div>
          
          {/* Listings carousel will be implemented here */}
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-accent/10">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to move?</h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8">
              Let's find your dream home or get the best value for your current property.
            </p>
            <button
              onClick={() => handleCTAClick('contact')}
              className="px-8 py-4 bg-accent hover:bg-accent/80 text-white rounded-lg font-semibold transition-colors duration-300"
            >
              Let's Chat
            </button>
          </motion.div>
        </div>
      </section>

      {/* Modal for Sell/Estimate Forms */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-primary p-8 rounded-lg max-w-md w-full mx-4"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold mb-6">
                {modalType === 'sell' ? 'Sell Your Home' : 'Get a Free Estimate'}
              </h3>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Address"
                  className="w-full p-3 bg-primary/50 border border-gray-700 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full p-3 bg-primary/50 border border-gray-700 rounded-lg"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-3 bg-primary/50 border border-gray-700 rounded-lg"
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  className="w-full p-3 bg-primary/50 border border-gray-700 rounded-lg"
                />
                <button
                  type="submit"
                  className="w-full py-3 bg-accent hover:bg-accent/80 text-white rounded-lg font-semibold transition-colors duration-300"
                >
                  Submit
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomePage;
