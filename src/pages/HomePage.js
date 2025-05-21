import React, { useEffect } from 'react';
import HeroSection from '../components/HeroSection'; // Import HeroSection
import QuickStats from '../components/QuickStats'; // Import QuickStats
import FeaturedListingsSlider from '../components/FeaturedListingsSlider'; // Import FeaturedListingsSlider
import TestimonialsSlider from '../components/TestimonialsSlider'; // Import TestimonialsSlider
import CTAStrip from '../components/CTAStrip'; // Import CTAStrip
import { addLog } from '../utils/inAppLogger'; // Import the logger

const HomePage = () => {
  useEffect(() => {
    addLog('HomePage: Mounted');
    return () => {
      addLog('HomePage: Unmounted');
    };
  }, []);

  addLog('HomePage: Rendering');
  return (
    <div className="homepage">
      <HeroSection /> {/* Render HeroSection */}
      <QuickStats /> {/* Render QuickStats */}
      <FeaturedListingsSlider /> {/* Render FeaturedListingsSlider */}
      <TestimonialsSlider /> {/* Render TestimonialsSlider */}
      <CTAStrip /> {/* Render CTAStrip */}
    </div>
  );
};

export default HomePage;

