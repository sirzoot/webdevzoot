import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';

const AboutPage = () => {
  const navigate = useNavigate();
  const [activeTeamMember, setActiveTeamMember] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end start"]
  });

  // Sample data - replace with your actual content
  const teamMembers = [
    {
      id: 1,
      name: "John Smith",
      title: "Founder & CEO",
      image: "/team/john.jpg",
      summary: "With over 20 years in real estate, John has helped hundreds of families find their dream homes.",
      quote: "Every home tells a story. Our job is to help write the next chapter."
    },
    // Add more team members...
  ];

  const milestones = [
    {
      year: "2005",
      title: "Our Beginning",
      description: "Founded with a vision to revolutionize real estate through exceptional service and innovative technology.",
      image: "/timeline/2005.jpg"
    },
    {
      year: "2010",
      title: "First Office",
      description: "Opened our flagship office in downtown, marking the start of our local presence.",
      image: "/timeline/2010.jpg"
    },
    // Add more milestones...
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "Miami Beach",
      image: "/testimonials/sarah.jpg",
      quote: "The team made our home buying experience seamless and stress-free. Their attention to detail is unmatched."
    },
    // Add more testimonials...
  ];

  const serviceAreas = [
    { name: "Miami Beach", coordinates: { x: 50, y: 50 } },
    { name: "Downtown", coordinates: { x: 60, y: 40 } },
    // Add more service areas...
  ];

  const handleTeamNavigation = (direction) => {
    setActiveTeamMember(prev => {
      const next = prev + direction;
      if (next < 0) return teamMembers.length - 1;
      if (next >= teamMembers.length) return 0;
      return next;
    });
  };

  const handleTestimonialNavigation = (direction) => {
    setActiveTestimonial(prev => {
      const next = prev + direction;
      if (next < 0) return testimonials.length - 1;
      if (next >= testimonials.length) return 0;
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-primary text-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/50" />
          <img
            src="/about/hero.jpg"
            alt="About Us"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">Our Story</h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8">
              We're more than just real estate agents. We're your partners in finding the perfect place to call home.
            </p>
            <p className="text-lg text-gray-300">
              With over 15 years of experience, we've helped thousands of families find their dream homes while maintaining
              the highest standards of service and integrity in the industry.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section ref={timelineRef} className="py-20 bg-primary">
        <div className="container-custom">
          <h2 className="text-4xl font-bold mb-12 text-center">Our Journey</h2>
          <div className="space-y-20">
            {milestones.map((milestone, index) => {
              const x = useTransform(
                scrollYProgress,
                [0, 1],
                [index % 2 === 0 ? -100 : 100, 0]
              );
              const opacity = useTransform(
                scrollYProgress,
                [0, 0.2, 0.8, 1],
                [0, 1, 1, 0]
              );

              return (
                <motion.div
                  key={milestone.year}
                  style={{ x, opacity }}
                  className={`flex flex-col ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } gap-8 items-center`}
                >
                  <div className="w-full md:w-1/2">
                    <h3 className="text-3xl font-bold mb-2">{milestone.year}</h3>
                    <h4 className="text-2xl font-semibold mb-4">{milestone.title}</h4>
                    <p className="text-gray-300">{milestone.description}</p>
                  </div>
                  <div className="w-full md:w-1/2">
                    <img
                      src={milestone.image}
                      alt={milestone.title}
                      className="w-full h-64 md:h-96 object-cover rounded-lg"
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-primary/80">
        <div className="container-custom">
          <h2 className="text-4xl font-bold mb-12 text-center">Meet Our Team</h2>
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTeamMember}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col md:flex-row gap-8 items-center"
              >
                <div className="w-full md:w-1/2">
                  <img
                    src={teamMembers[activeTeamMember].image}
                    alt={teamMembers[activeTeamMember].name}
                    className="w-full h-96 object-cover rounded-lg"
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <h3 className="text-3xl font-bold mb-2">
                    {teamMembers[activeTeamMember].name}
                  </h3>
                  <p className="text-xl text-accent mb-4">
                    {teamMembers[activeTeamMember].title}
                  </p>
                  <p className="text-gray-300 mb-4">
                    {teamMembers[activeTeamMember].summary}
                  </p>
                  <blockquote className="text-gray-400 italic">
                    "{teamMembers[activeTeamMember].quote}"
                  </blockquote>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={() => handleTeamNavigation(-1)}
                className="p-2 rounded-full bg-accent hover:bg-accent/80 transition-colors"
              >
                ←
              </button>
              <button
                onClick={() => handleTeamNavigation(1)}
                className="p-2 rounded-full bg-accent hover:bg-accent/80 transition-colors"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Local Focus Section */}
      <section className="py-20 bg-primary">
        <div className="container-custom">
          <h2 className="text-4xl font-bold mb-12 text-center">Our Service Areas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="relative h-96">
              <img
                src="/map.jpg"
                alt="Service Areas"
                className="w-full h-full object-cover rounded-lg"
              />
              {serviceAreas.map((area) => (
                <div
                  key={area.name}
                  className="absolute"
                  style={{ left: `${area.coordinates.x}%`, top: `${area.coordinates.y}%` }}
                >
                  <div className="w-4 h-4 bg-accent rounded-full" />
                  <div className="absolute left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-primary rounded text-sm">
                    {area.name}
                  </div>
                </div>
              ))}
            </div>
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="bg-primary/50 p-8 rounded-lg"
                >
                  <blockquote className="text-xl text-gray-300 mb-6">
                    "{testimonials[activeTestimonial].quote}"
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonials[activeTestimonial].image}
                      alt={testimonials[activeTestimonial].name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold">{testimonials[activeTestimonial].name}</p>
                      <p className="text-gray-400">{testimonials[activeTestimonial].location}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
              <div className="flex justify-center gap-4 mt-8">
                <button
                  onClick={() => handleTestimonialNavigation(-1)}
                  className="p-2 rounded-full bg-accent hover:bg-accent/80 transition-colors"
                >
                  ←
                </button>
                <button
                  onClick={() => handleTestimonialNavigation(1)}
                  className="p-2 rounded-full bg-accent hover:bg-accent/80 transition-colors"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-accent/10">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">Work with a Team You Can Trust</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Let's find your dream home together. Our experienced team is ready to guide you through every step of the process.
            </p>
            <button
              onClick={() => navigate('/contact')}
              className="px-8 py-4 bg-accent hover:bg-accent/80 text-white rounded-lg font-semibold transition-colors"
            >
              Get in Touch
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage; 