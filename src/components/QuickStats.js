import React from 'react';
import './QuickStats.css'; // CSS for styling

const QuickStats = () => {
  // Data can be dynamic or fetched from a backend in a real application
  const stats = [
    { id: 1, value: '150+', label: 'Homes Sold' },
    { id: 2, value: '10+', label: 'Years in Business' },
    { id: 3, value: '30 Days', label: 'Avg. DOM' },
    // Add more stats as needed
  ];

  return (
    <section className="quick-stats-section">
      <div className="stats-container">
        {stats.map(stat => (
          <div key={stat.id} className="stat-item">
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default QuickStats;

