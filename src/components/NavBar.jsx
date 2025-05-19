import '../css/NavBar.css';
import logo from '../assets/images/LOGO WITH TEXT.png';
import logoutIcon from '../assets/images/logout.png';

import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import clickSound from '../assets/sounds/click.wav'; 

import { toast } from 'react-toastify';


function NavBar({ openLogin, openSignUp, currentUser }) {
    const handleLogout = async () => {
    try {
        await signOut(auth);
        toast.success("Logged out successfully.");
    } catch (error) {
        console.error("Logout error:", error.message);
        toast.error("Logout failed. Please try again.");
    }
    };

    const playClickSound = () => {
        const audio = new Audio(clickSound);
        audio.play();
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
        return name.split(" ")[0];
    };

    return (
        <div className="navigation">
            <nav className="navbar navbar-expand-xxl">
                <div className="container-fluid d-flex align-items-center ms-3">
                    <Link className="navbar-brand" to="/" onClick={playClickSound}>
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
                                        <Link className="nav-link" to="/motorcycles" onClick={playClickSound}>Motorcycles</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/maintenance-dashboard" onClick={playClickSound}>Maintenance Schedule</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/maintenance-logs" onClick={playClickSound}>Maintenance Log</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/cost-tracker" onClick={playClickSound}>Cost Tracker</Link>
                                    </li>
                                </>
                            )}
                            <li className="nav-item">
                                <Link className="nav-link" to="/tips" onClick={playClickSound}>Tips</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about" onClick={playClickSound}>About</Link>
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
                                        onClick={() => {
                                            playClickSound();
                                            handleLogout();
                                        }} 
                                        className="logout-icon" 
                                        style={{ width: "30px", height: "30px", cursor: "pointer" }}
                                    />
                                </>
                            ) : (
                                <>
                                    <button className="login-btn me-2" onClick={() => {
                                        playClickSound();
                                        openLogin();
                                    }}>
                                        Log In
                                    </button>
                                    <button className="signup-btn" onClick={() => {
                                        playClickSound();
                                        openSignUp();
                                    }}>
                                        Sign Up
                                    </button>
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
