function NavBar() {
    return (
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid d-flex align-items-center">
          {/* Logo */}
          <a className="navbar-brand" href="#">
            <img src="src/assets/images/MOTOR ISOLATED LOGO.png" alt="Logo" width={50} />
          </a>
  
          {/* Title */}
          <h1 className="mb-0 me-3">RIDESMART PH</h1>
  
          {/* Toggler Button for Mobile View */}
          <button
            className="navbar-toggler ms-auto"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
  
          {/* Collapsible Navbar Content */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="#">Link</a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><a className="dropdown-item" href="#">Action</a></li>
                  <li><a className="dropdown-item" href="#">Another action</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">About</a>
              </li>
            </ul>
  
            {/* Log In and Sign Up Buttons */}
            <div id="buttons" className="ms-auto d-flex align-items-center">
            <a className="btn me-2" href="#" role="button">Log In</a>
            <a className="btn signup-btn" href="#" role="button">Sign Up</a>
            </div>

          </div>
        </div>
      </nav>
    );
  }
  
  export default NavBar;
  