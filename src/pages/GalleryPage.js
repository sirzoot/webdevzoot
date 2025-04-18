import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const GalleryPage = () => {
  const [viewMode, setViewMode] = useState('gallery'); // 'gallery' | 'list' | 'map'
  const [filters, setFilters] = useState({
    price: { min: 0, max: 10000000 },
    beds: null,
    baths: null,
    location: null,
    type: null
  });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  // Sample data - replace with your actual listings data
  const listings = [
    {
      id: 1,
      title: 'Modern Waterfront Estate',
      price: 2500000,
      beds: 4,
      baths: 3.5,
      location: 'Miami Beach',
      type: 'Single Family',
      images: ['/listings/1-1.jpg', '/listings/1-2.jpg', '/listings/1-3.jpg'],
      video: '/listings/1-preview.mp4',
      description: 'Stunning waterfront property with panoramic ocean views'
    },
    // Add more listings...
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleFilterChange = (filter, value) => {
    setFilters(prev => ({
      ...prev,
      [filter]: value
    }));
  };

  const filteredListings = listings.filter(listing => {
    // Implement your filtering logic here
    return true;
  });

  const ListingCard = ({ listing }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [ref, inView] = useInView({
      triggerOnce: true,
      threshold: 0.1
    });

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-[4/3]">
          <motion.img
            src={listing.images[0]}
            alt={listing.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 0.7 : 0 }}
            className="absolute inset-0 bg-black"
          />
        </div>

        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute inset-0 flex flex-col justify-end p-6"
            >
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-2xl font-bold text-white mb-2"
              >
                {listing.title}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-white mb-4"
              >
                ${listing.price.toLocaleString()}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex gap-4 text-white mb-4"
              >
                <span>{listing.beds} beds</span>
                <span>{listing.baths} baths</span>
              </motion.div>
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                onClick={() => setSelectedListing(listing)}
                className="px-4 py-2 bg-white text-primary rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                View Details
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-primary text-white">
      {/* View Mode Toggle */}
      <div className="fixed top-4 right-4 z-10">
        <div className="flex gap-2 bg-primary/80 backdrop-blur-sm p-2 rounded-lg">
          {['gallery', 'list', 'map'].map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                viewMode === mode ? 'bg-accent text-white' : 'text-gray-300 hover:text-white'
              }`}
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Filters Button */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="fixed top-4 left-4 z-10 px-4 py-2 bg-primary/80 backdrop-blur-sm rounded-lg text-white hover:bg-primary/90 transition-colors"
      >
        Filters
      </button>

      {/* Filters Modal */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-20 flex items-center justify-center"
            onClick={() => setShowFilters(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-primary p-8 rounded-lg max-w-md w-full mx-4"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold mb-6">Filter Properties</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Price Range</label>
                  <div className="flex gap-4">
                    <input
                      type="number"
                      placeholder="Min"
                      className="w-full p-2 bg-primary/50 border border-gray-700 rounded-lg"
                      value={filters.price.min}
                      onChange={(e) => handleFilterChange('price', { ...filters.price, min: e.target.value })}
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      className="w-full p-2 bg-primary/50 border border-gray-700 rounded-lg"
                      value={filters.price.max}
                      onChange={(e) => handleFilterChange('price', { ...filters.price, max: e.target.value })}
                    />
                  </div>
                </div>
                {/* Add more filter inputs */}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="container-custom pt-20">
        {viewMode === 'gallery' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}

        {viewMode === 'list' && (
          <div className="space-y-4">
            {filteredListings.map((listing) => (
              <div key={listing.id} className="bg-primary/50 p-4 rounded-lg">
                {/* List view layout */}
              </div>
            ))}
          </div>
        )}

        {viewMode === 'map' && (
          <div className="h-[calc(100vh-5rem)]">
            {/* Map view implementation */}
          </div>
        )}
      </div>

      {/* Listing Details Modal */}
      <AnimatePresence>
        {selectedListing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-30 flex items-center justify-center"
            onClick={() => setSelectedListing(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-primary p-8 rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              {/* Listing details content */}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom Cursor */}
      <motion.div
        className="fixed pointer-events-none z-50"
        animate={{
          x: cursorPosition.x - 16,
          y: cursorPosition.y - 16,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 200 }}
      >
        <div className="w-8 h-8 rounded-full bg-accent/20 border border-accent backdrop-blur-sm" />
      </motion.div>
    </div>
  );
};

export default GalleryPage;
