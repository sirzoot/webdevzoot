import React from 'react';
import './TestimonialsSlider.css'; // CSS for styling

// Sample data for testimonials - in a real app, this would come from an API
const testimonials = [
  {
    id: 1,
    quote: 'Working with Showcase was a dream. They sold our home in record time and above asking!',
    name: 'Jane D.',
    location: 'Dream City, CA',
    // image: '/images/client1.jpg', // Optional: path to client image
  },
  {
    id: 2,
    quote: 'The team\'s professionalism and market knowledge are unmatched. Highly recommend!',
    name: 'John S.',
    location: 'Richville, CA',
    // image: '/images/client2.jpg',
  },
  {
    id: 3,
    quote: 'They made the complex process of buying our first luxury home feel so easy and enjoyable.',
    name: 'Emily B.',
    location: 'Elite Town, CA',
    // image: '/images/client3.jpg',
  },
  // Add more testimonials as needed
];

const TestimonialsSlider = () => {
  // Basic slider logic (manual for now, can be enhanced with a library)
  // This example will just display them in a row that could be scrollable or stacked
  return (
    <section className="testimonials-section">
      <h2 className="section-title">What Our Clients Say</h2>
      <div className="testimonials-slider-container">
        {testimonials.map(testimonial => (
          <div key={testimonial.id} className="testimonial-card">
            {/* {testimonial.image && <img src={testimonial.image} alt={testimonial.name} className="testimonial-image" />} */}
            <p className="testimonial-quote">"{testimonial.quote}"</p>
            <p className="testimonial-name">- {testimonial.name}, {testimonial.location}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSlider;

