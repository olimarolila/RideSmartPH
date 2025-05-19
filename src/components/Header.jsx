import React, { useState, useEffect } from 'react';
import '../css/Header.css';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

function Header({ openLogin }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  return (
    <div className="header-section">
      <div className="header-left">
        <h1 className="header-title text-uppercase">Motorcycle Maintenance for Sustainability</h1>
        <p className="header-subtitle">
          Track your maintenance schedule and keep your motorcycle running efficiently to reduce your environmental impact.
        </p>

        {/* Show button only if user is NOT logged in */}
        {!currentUser && (
          <button className="get-started-btn" onClick={openLogin}>
            Get Started
          </button>
        )}
      </div>
    </div>
  );
}

export default Header;
