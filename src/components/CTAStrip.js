import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CTAStrip.css'; // CSS for styling

const CTAStrip = () => {
  const navigate = useNavigate();

  const handleContactClick = () => {
    navigate('/contact');
  };

  return (
    <section className="cta-strip-section">
      <div className="cta-content">
        <h2 className="cta-title">Ready to Make Your Move?</h2>
        <p className="cta-subtitle">Let's chat about your real estate goals. Our team is here to help you every step of the way.</p>
        <button className="cta-button-contact" onClick={handleContactClick}>
          Get in Touch
        </button>
      </div>
    </section>
  );
};

export default CTAStrip;

