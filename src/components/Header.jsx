function Header({ openLogin }) {
    return (
      <div className="header-section">
        <div className="header-left">
          <h1 className="header-title">Motorcycle Maintenance for Sustainability</h1>
          <p className="header-subtitle">
            Track your maintenance schedule and keep your motorcycle running efficiently to reduce your environmental impact.
          </p>
          <button className="get-started-btn" onClick={openLogin}>Get Started</button>
        </div>
      </div>
    );
  }
  
  export default Header;
  