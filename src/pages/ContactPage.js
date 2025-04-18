import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ContactPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [showThankYou, setShowThankYou] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
      }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setShowThankYou(true);
        setFormData({
          name: '',
          email: '',
      phone: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-primary text-white">
      {/* Page Header */}
      <section className="py-20 bg-primary">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">Let's Talk</h1>
            <p className="text-xl md:text-2xl text-gray-300">
              Real people. Fast response.
            </p>
          </motion.div>
        </div>
      </section>
          
      {/* Main Content */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-primary/50 p-8 rounded-lg shadow-lg"
          >
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold mb-4">Send us a Message</h2>
              <p className="text-gray-300">
                Have questions about buying or selling? We're here to help.
              </p>
                </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                  onChange={handleInputChange}
                    required
                  className="w-full p-4 bg-primary/30 border border-gray-700 rounded-lg focus:border-accent focus:ring-2 focus:ring-accent/50 transition-all"
                  placeholder="Your name"
                />
                </div>
                
                <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                  onChange={handleInputChange}
                    required
                  className="w-full p-4 bg-primary/30 border border-gray-700 rounded-lg focus:border-accent focus:ring-2 focus:ring-accent/50 transition-all"
                  placeholder="your@email.com"
                  />
                </div>
                
                <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                  Phone (Optional)
                  </label>
                  <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-4 bg-primary/30 border border-gray-700 rounded-lg focus:border-accent focus:ring-2 focus:ring-accent/50 transition-all"
                  placeholder="(555) 123-4567"
                />
                </div>
                
                <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                  onChange={handleInputChange}
                    required
                  rows="6"
                  className="w-full p-4 bg-primary/30 border border-gray-700 rounded-lg focus:border-accent focus:ring-2 focus:ring-accent/50 transition-all"
                  placeholder="How can we help you?"
                />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                className="w-full py-4 bg-accent hover:bg-accent/80 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>

            {/* Live Chat Banner */}
            <div className="mt-8 p-4 bg-accent/10 rounded-lg text-center">
              <p className="text-gray-300">
                Prefer instant help?{' '}
                <button
                  onClick={() => {/* Implement chat widget trigger */}}
                  className="text-accent hover:text-accent/80 underline"
                >
                  Chat now
                </button>
              </p>
            </div>
          </motion.div>

          {/* Contact Info Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-primary/50 rounded-lg overflow-hidden">
              <img
                src="/contact/map.jpg"
                alt="Office Location"
                className="w-full h-full object-cover opacity-20"
              />
            </div>
            
            <div className="relative p-8 space-y-8">
              <h2 className="text-3xl font-bold">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Phone</h3>
                    <a
                      href="tel:+15551234567"
                      className="text-gray-300 hover:text-accent transition-colors"
                    >
                      (555) 123-4567
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Email</h3>
                    <a
                      href="mailto:info@showcase.com"
                      className="text-gray-300 hover:text-accent transition-colors"
                    >
                      info@showcase.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Address</h3>
                    <p className="text-gray-300">
                      123 Main Street<br />
                      Miami Beach, FL 33139
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-gray-700">
                <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center hover:bg-accent/30 transition-colors"
                  >
                    <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  {/* Add more social links */}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Thank You Modal */}
      <AnimatePresence>
        {showThankYou && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
            onClick={() => setShowThankYou(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-primary p-8 rounded-lg max-w-md w-full mx-4 text-center"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold mb-4">Thank You!</h3>
              <p className="text-gray-300 mb-6">
                We've received your message and will get back to you shortly.
              </p>
              <div className="space-y-4">
                <button
                  onClick={() => navigate('/listings')}
                  className="w-full py-3 bg-accent hover:bg-accent/80 text-white rounded-lg font-semibold transition-colors"
                >
                  Explore Listings
                </button>
                <button
                  onClick={() => setShowThankYou(false)}
                  className="w-full py-3 bg-primary/50 hover:bg-primary/70 text-white rounded-lg font-semibold transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Widget */}
      <div className="fixed bottom-4 right-4 z-40">
        <button
          onClick={() => {/* Implement chat widget trigger */}}
          className="w-12 h-12 bg-accent rounded-full flex items-center justify-center shadow-lg hover:bg-accent/80 transition-colors"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ContactPage;
