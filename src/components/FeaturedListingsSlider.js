import React from 'react';
import './FeaturedListingsSlider.css'; // CSS for styling

// Sample data for listings - in a real app, this would come from an API
const featuredListings = [
  {
    id: 1,
    image: '/images/contemporary_luxury_home_glass.jpeg', // Replace with actual image path
    price: '$2,500,000',
    address: '123 Luxury Lane, Dream City, CA 90210',
    beds: 4,
    baths: 5,
    sqft: '4,500 sqft'
  },
  {
    id: 2,
    image: '/images/illuminated_modern_home_evening.jpeg', // Replace with actual image path
    price: '$1,800,000',
    address: '456 Opulence Avenue, Richville, CA 90211',
    beds: 3,
    baths: 3.5,
    sqft: '3,200 sqft'
  },
  {
    id: 3,
    image: '/images/exterior_contemporary_building.jpeg', // Replace with actual image path
    price: '$3,200,000',
    address: '789 Grand Boulevard, Elite Town, CA 90212',
    beds: 5,
    baths: 6,
    sqft: '6,000 sqft'
  },
  // Add more listings as needed
];

const FeaturedListingsSlider = () => {
  // Basic slider logic (manual for now, can be enhanced with a library)
  // For simplicity, this example will just display them in a row that could be scrollable
  return (
    <section className="featured-listings-section">
      <h2 className="section-title">Featured Listings</h2>
      <div className="listings-slider-container">
        {featuredListings.map(listing => (
          <div key={listing.id} className="listing-card">
            <img src={listing.image} alt={`Listing at ${listing.address}`} className="listing-image" />
            <div className="listing-info">
              <div className="listing-price">{listing.price}</div>
              <div className="listing-address">{listing.address}</div>
              <div className="listing-details">
                <span>{listing.beds} Beds</span> | 
                <span>{listing.baths} Baths</span> | 
                <span>{listing.sqft}</span>
              </div>
              <button className="listing-cta">View Details</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedListingsSlider;

