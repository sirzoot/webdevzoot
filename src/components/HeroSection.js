import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './HeroSection.css'; // We will create this CSS file next

const HeroSection = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  // One of the curated images will be used here, e.g., luxury_modern_house_lake.png
  // For now, using a placeholder background color or a generic image URL
  const heroStyle = {    backgroundImage: `url("/images/luxury_modern_house_lake.jpeg")`, // Using one of the curated images    // Or use an inline style for a color if image isn't set up yet
    backgroundColor: '#e9ecef', // A light placeholder color
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: '#333',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  };

  const handleBuyClick = () => {
    navigate('/listings'); // Navigate to Listings page
  };

  const handleSellClick = () => {
    // Placeholder for Sell modal functionality
    console.log('Sell button clicked - Modal to be implemented');
    alert('Sell functionality (modal with form) will be implemented soon!');
  };

  const handleEstimateClick = () => {
    // Placeholder for Estimate modal functionality
    console.log('Get Estimate button clicked - Modal to be implemented');
    alert('Get Estimate functionality (modal with form) will be implemented soon!');
  };

  return (
    <section className="hero-section" style={heroStyle}>
      {/* Centered logo + tagline will be added here based on writeup */}
      {/* For now, using the main logo image used in preloader/navbar */}
      <img src="/assets/logo.png" alt="Showcase Real Estate Group Logo" className="hero-logo" />
      <h1 className="hero-tagline">Your Home, Showcased to Perfection</h1>
      <div className="hero-cta-buttons">
        <button className="cta-button buy" onClick={handleBuyClick}>Buy</button>
        <button className="cta-button sell" onClick={handleSellClick}>Sell</button>
        <button className="cta-button estimate" onClick={handleEstimateClick}>Get Estimate</button>
      </div>
    </section>
  );
};

export default HeroSection;

