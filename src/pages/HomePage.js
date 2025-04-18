import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import gsap from 'gsap';

const HomePage = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const heroRef = useRef(null);
  
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);
  
  useEffect(() => {
    if (heroRef.current) {
      const images = heroRef.current.querySelectorAll('.hero-image');
      
      gsap.fromTo(
        images,
        { 
          y: 100, 
          opacity: 0 
        },
        { 
          y: 0, 
          opacity: 1, 
          stagger: 0.2, 
          duration: 1,
          ease: 'power3.out',
        }
      );
    }
  }, []);
  
  const handleMouseMove = (e) => {
    if (heroRef.current) {
      const images = heroRef.current.querySelectorAll('.parallax-image');
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 20;
      const yPos = (clientY / window.innerHeight - 0.5) * 20;
      
      images.forEach((image, index) => {
        const factor = (index + 1) * 0.2;
        gsap.to(image, {
          x: xPos * factor,
          y: yPos * factor,
          duration: 0.5,
          ease: 'power1.out',
        });
      });
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
      {/* Hero Section */}
      <section 
        className="hero-section flex items-center justify-center relative overflow-hidden"
        ref={heroRef}
        onMouseMove={handleMouseMove}
      >
        <div className="absolute inset-0 z-0">
          <div className="grid grid-cols-3 gap-4 opacity-20">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div 
                key={item} 
                className={`parallax-image bg-accent/30 rounded-lg h-64 transform transition-all duration-500 ease-out`}
                style={{ 
                  transform: 'translateZ(0)',
                }}
              />
            ))}
          </div>
        </div>
        
        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-4">LARRY</h1>
            <p className="text-xl md:text-2xl text-gray-300">Creating modern, fluid websites with engaging animations</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <a href="#about" className="btn-primary inline-block">Learn More</a>
          </motion.div>
        </div>
      </section>
      
      {/* About Section */}
      <section id="about" className="section-padding bg-primary">
        <div className="container-custom">
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">About Us</h2>
              <p className="text-gray-300 mb-6">
                We create modern, fluid websites with engaging animations that aren't overwhelming.
                Our focus is on capturing your audience's attention rapidly and converting them into
                interested clients.
              </p>
              <p className="text-gray-300">
                We believe in true fluidity throughout the scroll with cool animations that enhance
                the user experience without being distracting. Our websites are designed to be
                simple, clean, and straight to the point.
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((item) => (
                <div 
                  key={item} 
                  className="hero-image bg-accent/20 rounded-lg h-40 md:h-64 overflow-hidden"
                >
                  <div className="w-full h-full bg-gradient-to-br from-accent/30 to-transparent" />
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="section-padding bg-primary/80">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              We offer a range of services to help you create a modern, fluid website that captures your audience's attention.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Web Design",
                description: "Modern, fluid websites with engaging animations that capture your audience's attention."
              },
              {
                title: "Development",
                description: "Custom development solutions that bring your vision to life with the latest technologies."
              },
              {
                title: "Branding",
                description: "Create a consistent brand identity across all your digital platforms."
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-primary/50 p-8 rounded-lg border border-gray-800 hover:border-accent transition-all duration-300"
              >
                <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                <p className="text-gray-400">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="section-padding bg-accent/10">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to get started?</h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8">
              Let's create a modern, fluid website that captures your audience's attention and converts them into clients.
            </p>
            <a href="/contact" className="btn-primary">Contact Us</a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
