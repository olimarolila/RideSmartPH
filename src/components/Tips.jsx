// components/Tips.jsx
import React from 'react';
import '../css/Tips.css'; // optional, for styling

function Tips() {
  const tips = [
    { title: 'Check Tire Pressure', description: 'Keep your tires inflated.', icon: '🛞' },
    { title: 'Oil Change', description: 'Change oil every 5,000 km.', icon: '🛢️' },
    { title: 'Eco Riding', description: 'Avoid aggressive acceleration.', icon: '🌱' },
  ];

  return (
    <div className="tips-container">
      <h2>Maintenance Tips</h2>
      <div className="tips-grid">
        {tips.map((tip, idx) => (
          <div key={idx} className="tip-card">
            <div className="tip-icon">{tip.icon}</div>
            <h3>{tip.title}</h3>
            <p>{tip.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tips;
