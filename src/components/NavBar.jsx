import '../css/NavBar.css';

function NavBar({ openLogin, openSignUp }) {
    return (
        <div className="navigation">
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid d-flex align-items-center ms-3">
                    <a className="navbar-brand" href="#">
                        <img src="src/assets/images/MOTOR ISOLATED LOGO.png" alt="Logo" width={50} />
                    </a>
                    <h1 className="mb-0 me-3">RIDESMART PH</h1>
                    <button type="button" className="navbar-toggler ms-auto"  data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link" href="src/components/Dashboard.jsx">Dashboard</a>
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
                            <button className="login-btn me-2" onClick={openLogin}>Log In</button>
                            <button className="signup-btn" onClick={openSignUp}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default NavBar;