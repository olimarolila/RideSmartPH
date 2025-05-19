import React from 'react';
import '../css/Footer.css';

export function Footer() {
    return (
        <footer className="ridesmart-footer" style={{ fontFamily: "'Inter', sans-serif" }}>
            <div className="footer-content">
                <p>© {new Date().getFullYear()} RideSmart PH. All rights reserved.</p>
                <p className="footer-sdg">
                    Aligned with <strong>Responsible Consumption and Production</strong>, RideSmart PH promotes preventive maintenance to support a cleaner environment.
                </p>
            </div>
        </footer>
    );
}

export default Footer;