import React from 'react';

export function Footer() {
  return (
    <footer className="ridesmart-footer">
    <div className="footer-content">
      <p>&copy; {new Date().getFullYear()} RideSmart PH. All rights reserved.</p>
      <p className="footer-sdg">
        Aligned with <strong>Responsible Consumption and Production</strong>,
        RideSmart PH promotes preventive maintenance to support a cleaner environment.
      </p>
    </div>
  </footer>
);
}

export default Footer;
