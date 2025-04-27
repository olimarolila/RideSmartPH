import { useState } from "react";

function NavBar() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid d-flex align-items-center">
          <a className="navbar-brand" href="#">
            <img src="src/assets/images/MOTOR ISOLATED LOGO.png" alt="Logo" width={50} />
          </a>
          <h1 className="mb-0 me-3">RIDESMART PH</h1>
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

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="#">Link</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
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

            <div id="buttons" className="ms-auto d-flex align-items-center">
              <button className="login-btn me-2" onClick={() => setShowLoginModal(true)}>Log In</button>
              <button className="signup-btn" onClick={() => setShowSignUpModal(true)}>Sign Up</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Login Modal */}
      <div className={`modal fade ${showLoginModal ? 'show d-block' : ''}`} tabIndex="-1" style={{backgroundColor: showLoginModal ? 'rgba(0,0,0,0.5)' : 'transparent'}}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Login</h5>
              <button type="button" className="btn-close" onClick={() => setShowLoginModal(false)}></button>
            </div>
            <div className="modal-body">
              <input type="email" className="form-control mb-3" placeholder="Email" />
              <input type="password" className="form-control mb-3" placeholder="Password" />
              <button className="btn btn-success w-100">Login</button>
              <p className="mt-3 text-center">
                Don’t have an account? <span style={{cursor: 'pointer', color: '#0d6efd'}} onClick={() => { setShowLoginModal(false); setShowSignUpModal(true); }}>Sign Up here</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sign Up Modal */}
      <div className={`modal fade ${showSignUpModal ? 'show d-block' : ''}`} tabIndex="-1" style={{backgroundColor: showSignUpModal ? 'rgba(0,0,0,0.5)' : 'transparent'}}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Sign Up</h5>
              <button type="button" className="btn-close" onClick={() => setShowSignUpModal(false)}></button>
            </div>
            <div className="modal-body">
              <input type="email" className="form-control mb-3" placeholder="Email" />
              <input type="password" className="form-control mb-3" placeholder="Password" />
              <button className="btn btn-success w-100">Sign Up</button>
              <p className="mt-3 text-center">
                Already have an account? <span style={{cursor: 'pointer', color: '#0d6efd'}} onClick={() => { setShowSignUpModal(false); setShowLoginModal(true); }}>Log In here</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar;
