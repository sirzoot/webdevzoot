import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const GalleryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [galleryItems, setGalleryItems] = useState([]);
  
  // Mock gallery items - in a real app, these would come from an API
  useEffect(() => {
    const items = [
      {
        id: 1,
        title: 'Modern Website Design',
        category: 'web',
        image: 'https://via.placeholder.com/600x400/3b82f6/ffffff?text=Modern+Website',
      },
      {
        id: 2,
        title: 'E-commerce Platform',
        category: 'web',
        image: 'https://via.placeholder.com/600x400/3b82f6/ffffff?text=E-commerce',
      },
      {
        id: 3,
        title: 'Brand Identity',
        category: 'branding',
        image: 'https://via.placeholder.com/600x400/3b82f6/ffffff?text=Brand+Identity',
      },
      {
        id: 4,
        title: 'Mobile App UI',
        category: 'mobile',
        image: 'https://via.placeholder.com/600x400/3b82f6/ffffff?text=Mobile+App',
      },
      {
        id: 5,
        title: 'Corporate Website',
        category: 'web',
        image: 'https://via.placeholder.com/600x400/3b82f6/ffffff?text=Corporate+Site',
      },
      {
        id: 6,
        title: 'Logo Design',
        category: 'branding',
        image: 'https://via.placeholder.com/600x400/3b82f6/ffffff?text=Logo+Design',
      },
      {
        id: 7,
        title: 'Social Media Campaign',
        category: 'marketing',
        image: 'https://via.placeholder.com/600x400/3b82f6/ffffff?text=Social+Media',
      },
      {
        id: 8,
        title: 'Product Photography',
        category: 'photography',
        image: 'https://via.placeholder.com/600x400/3b82f6/ffffff?text=Product+Photography',
      },
    ];
    
    setGalleryItems(items);
  }, []);
  
  const filteredItems = selectedCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);
  
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'web', name: 'Web Design' },
    { id: 'branding', name: 'Branding' },
    { id: 'mobile', name: 'Mobile' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'photography', name: 'Photography' },
  ];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <div className="min-h-screen bg-primary text-white pt-24 pb-16">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Gallery</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Explore our portfolio of modern, fluid websites and digital projects that capture audience attention.
          </p>
        </motion.div>
        
        {/* Filter Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full transition-all ${
                selectedCategory === category.id
                  ? 'bg-accent text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {category.name}
            </button>
          ))}
        </motion.div>
        
        {/* Gallery Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredItems.map((item) => (
            <GalleryItem key={item.id} item={item} variants={itemVariants} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

const GalleryItem = ({ item, variants }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      ref={ref}
      variants={variants}
      className="relative overflow-hidden rounded-lg group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-w-16 aspect-h-9 bg-gray-800 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-cover transition-transform duration-500 ease-out"
          style={{
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          }}
        />
      </div>
      
      <motion.div 
        className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent p-6 flex flex-col justify-end"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
        <p className="text-gray-300 text-sm">{item.category}</p>
        <button className="mt-4 text-accent hover:underline self-start">View Project</button>
      </motion.div>
    </motion.div>
  );
};

export default GalleryPage;
