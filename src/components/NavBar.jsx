import '../css/NavBar.css';
import logo from '../assets/images/LOGO WITH TEXT.png';
import logoutIcon from '../assets/images/logout.png'; // ✅ import the icon

import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

function NavBar({ openLogin, openSignUp, currentUser }) {
    const handleLogout = async () => {
        try {
            await signOut(auth);
            alert("Logged out successfully.");
        } catch (error) {
            console.error("Logout error:", error.message);
        }
    };

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good morning";
        if (hour < 18) return "Good afternoon";
        return "Good evening";
    };

    const getDisplayName = () => {
    if (!currentUser) return "";
    const name = currentUser.displayName || currentUser.email.split("@")[0];
    return name.split(" ")[0]; // only the first word (first name)
};


    return (
        <div className="navigation">
            <nav className="navbar navbar-expand-xxl">
                <div className="container-fluid d-flex align-items-center ms-3">
                    <Link className="navbar-brand" to="/">
                        <img src={logo} alt="Logo" width={280} />
                    </Link>
                    <button type="button" className="navbar-toggler ms-auto" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                    {currentUser && (
                        <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/motorcycles">Motorcycles</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/maintenance-dashboard">Maintenance Schedule</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/maintenance-logs">Maintenance Log</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/cost-tracker">Cost Tracker</Link>
                        </li>
                        </>
                    )}

                    {/* Always visible links */}
                    <li className="nav-item">
                        <Link className="nav-link" to="/tips">Tips</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/about">About</Link>
                    </li>
                    </ul>



                        <div id="buttons" className="ms-auto d-flex align-items-center">
                            {currentUser ? (
                                <>
                                    <span className="nav-link me-3">
                                        {getGreeting()}, {getDisplayName()}!
                                    </span>
                                    <img 
                                        src={logoutIcon} 
                                        alt="Logout" 
                                        onClick={handleLogout} 
                                        className="logout-icon" 
                                        style={{ width: "30px", height: "30px", cursor: "pointer" }}
                                    />
                                </>
                            ) : (
                                <>
                                    <button className="login-btn me-2" onClick={openLogin}>Log In</button>
                                    <button className="signup-btn" onClick={openSignUp}>Sign Up</button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default NavBar;
