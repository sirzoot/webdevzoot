import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './AboutPage.css'; // CSS for styling
import { addLog } from '../utils/inAppLogger'; // Import the logger

// Placeholder data - replace with actual or fetched data
const teamMembers = [
  {
    id: 1,
    name: 'Larry Showcase',
    title: 'Founder & CEO',
    summary: 'With over 20 years of experience, Larry leads with a passion for luxury real estate and client satisfaction.',
    image: '/images/team_placeholder_1.png', // Replace with actual image path
    quote: '"Our mission is to showcase your home to perfection."',
  },
  {
    id: 2,
    name: 'Jane Realty',
    title: 'Lead Agent',
    summary: 'Jane is a top-performing agent known for her market expertise and dedication to her clients.',
    image: '/images/team_placeholder_2.png',
    quote: '"Finding your dream home is my top priority."',
  },
  {
    id: 3,
    name: 'Mike Advisor',
    title: 'Senior Advisor',
    summary: 'Mike brings a wealth of knowledge in property investment and portfolio management.',
    image: '/images/team_placeholder_3.png',    quote: '"Strategic advice for your most valuable assets."',
  },
];

const milestones = [
  { year: '2005', description: 'Showcase Real Estate Group founded with a vision to redefine luxury real estate services.', image: '/images/milestone_2005.png' }, // Replace with actual image path
  { year: '2010', description: 'Expanded services to cover three major metropolitan areas, becoming a key player in the luxury market.', image: '/images/milestone_2010.png' },
  { year: '2015', description: 'Recognized with the "Top Luxury Brokerage" award for outstanding sales and client service.', image: '/images/milestone_2015.png' },
  { year: '2020', description: 'Launched innovative digital platforms, enhancing client experience and market reach.', image: '/images/milestone_2020.png' },
];

const AboutPage = () => {
  useEffect(() => {
    addLog('AboutPage: Mounted');
    return () => {
      addLog('AboutPage: Unmounted');
    };
  }, []);

  addLog('AboutPage: Rendering');
  const navigate = useNavigate(); // Initialize useNavigate
  return (
    <div className="about-page">
      {/* Intro Hero Section */}
      <section className="about-hero-section" style={{ backgroundImage: `url('/images/contemporary_luxury_home_glass.jpeg')` }}>
        <div className="hero-overlay">
          <h1>About Showcase Real Estate Group</h1>
          <p>Your trusted partners in luxury real estate, dedicated to providing exceptional service and unparalleled expertise.</p>
        </div>
      </section>

      {/* Timeline/Story Section */}
      <section className="timeline-story-section">
        <h2>Our Journey</h2>
        <div className="timeline-container">
          {milestones.map(milestone => (
            <div key={milestone.year} className="timeline-milestone">
              <div className="milestone-image-container">
                {/* <img src={milestone.image} alt={`Milestone ${milestone.year}`} className="milestone-image" /> */}
                <div className="milestone-year">{milestone.year}</div>
              </div>
              <div className="milestone-description">
                <p>{milestone.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Team Carousel Section */}
      <section className="team-carousel-section">
        <h2>Meet Our Experts</h2>
        <div className="team-members-container">
          {teamMembers.map(member => (
            <div key={member.id} className="team-member-card">
              {/* <img src={member.image} alt={member.name} className="team-member-image" /> */}
              <div className="team-member-image-placeholder">Image</div>
              <h3>{member.name}</h3>
              <h4>{member.title}</h4>
              <p className="member-summary">{member.summary}</p>
              {member.quote && <p className="member-quote"><em>{member.quote}</em></p>}
            </div>
          ))}
        </div>
      </section>

      {/* Local Focus Block - Placeholder */}
      <section className="local-focus-section">
        <h2>Our Local Expertise</h2>
        <p>Deeply rooted in the community, we offer insightful local market knowledge. More details and a map feature coming soon!</p>
        {/* Placeholder for map or testimonials */}
        <div className="map-placeholder">Local Map / Service Areas Placeholder</div>
      </section>

      {/* CTA Block */}
      <section className="about-cta-block">
        <h2>Work With a Team You Can Trust</h2>
        <p>Ready to start your real estate journey with us? Get in touch today!</p>        <button onClick={() => navigate("/contact")} className="cta-button-contact">          Contact Us
        </button>
      </section>
    </div>
  );
};

export default AboutPage;

