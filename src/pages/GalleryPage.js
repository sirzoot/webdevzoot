import React, { useState, useEffect } from 'react';
import FilterBar from '../components/FilterBar'; // Import FilterBar
import './ListingsPage.css'; // CSS for styling
import { addLog } from '../utils/inAppLogger'; // Import the logger

// Sample data for listings - in a real app, this would come from an API
const initialListings = [
  {
    id: 1,
    image: '/images/luxury_modern_house_lake.jpeg',
    price: '$2,500,000',
    priceValue: 2500000,
    address: '123 Luxury Lane, Dream City, CA 90210',
    beds: 4,
    baths: 5,
    sqft: '4,500 sqft',
    type: 'Single Family',
    status: 'For Sale'
  },
  {
    id: 2,
    image: '/images/contemporary_luxury_home_glass.jpeg',
    price: '$1,800,000',
    priceValue: 1800000,
    address: '456 Opulence Avenue, Richville, CA 90211',
    beds: 3,
    baths: 3.5,
    sqft: '3,200 sqft',
    type: 'Condo',
    status: 'For Sale'
  },
  {
    id: 3,
    image: '/images/illuminated_modern_home_evening.jpeg',
    price: '$3,200,000',
    priceValue: 3200000,
    address: '789 Grand Boulevard, Elite Town, CA 90212',
    beds: 5,
    baths: 6,
    sqft: '6,000 sqft',
    type: 'Estate',
    status: 'Pending'
  },
  {
    id: 4,
    image: '/images/exterior_contemporary_building.jpeg',
    price: '$1,250,000',
    priceValue: 1250000,
    address: '101 Skyline Drive, Metro City, CA 90213',
    beds: 2,
    baths: 2,
    sqft: '1,800 sqft',
    type: 'Townhouse',
    status: 'For Sale'
  },
  // Add more listings to showcase the gallery layout
];

const ListingsPage = () => {
  useEffect(() => {
    addLog('ListingsPage: Mounted');
    return () => {
      addLog('ListingsPage: Unmounted');
    };
  }, []);

  addLog('ListingsPage: Rendering');
  const [listings, setListings] = useState(initialListings);
  const [filteredListings, setFilteredListings] = useState(initialListings);

  const handleFilterChange = (filters) => {
    addLog('ListingsPage: handleFilterChange called with filters: ' + JSON.stringify(filters));
    let tempFilteredListings = initialListings.filter(listing => {
      let match = true;
      // Price Range Filter
      if (filters.priceRange) {
        const [minPrice, maxPrice] = filters.priceRange.split('-').map(p => p === '' || p === '+' ? Infinity : parseInt(p));
        if (filters.priceRange.endsWith('+')) {
          if (listing.priceValue < minPrice) match = false;
        } else {
          if (listing.priceValue < minPrice || listing.priceValue > maxPrice) match = false;
        }
      }
      // Beds Filter
      if (filters.beds && listing.beds < parseInt(filters.beds)) {
        match = false;
      }
      // Baths Filter
      if (filters.baths && listing.baths < parseInt(filters.baths)) {
        match = false;
      }
      // Property Type Filter
      if (filters.propertyType && listing.type !== filters.propertyType) {
        match = false;
      }
      return match;
    });
    setFilteredListings(tempFilteredListings);
  };

  return (
    <div className="listings-page">
      <div className="page-header">
        <h1>Our Exclusive Listings</h1>
        <p>Discover your next dream home from our curated collection of luxury properties.</p>
      </div>
      <FilterBar onFilterChange={handleFilterChange} />
      <div className="listings-gallery">
        {filteredListings.length > 0 ? (
          filteredListings.map(listing => (
            <div key={listing.id} className="listing-card-gallery">
              <div className="listing-image-container">
                <img src={listing.image} alt={`Listing at ${listing.address}`} className="listing-image-gallery" />
                <div className="listing-overlay">
                  <div className="overlay-price">{listing.price}</div>
                  <div className="overlay-details">
                    {listing.beds} Beds | {listing.baths} Baths | {listing.sqft}
                  </div>
                  <button className="overlay-cta">View Details</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="no-listings-message">No listings match your current filters. Try adjusting your search!</p>
        )}
      </div>
    </div>
  );
};

export default ListingsPage;

