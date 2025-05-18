import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

import NavBar from "./components/NavBar";
import Header from "./components/Header";
import Info from "./components/Info";
import Footer from "./components/Footer";
import LoginModal from "./components/LoginModal";  
import SignUpModal from "./components/SignUpModal"; 
import About from "./pages/About"; 
import Dashboard from "./pages/Dashboard"; 
import MDashboard from "./components/MDashboard";
<<<<<<< HEAD
import Tips from "./components/Tips"; // ✅ Import Tips component
=======
import MaintenanceLogs from "./components/MaintenanceLogs"; // adjust path if needed

>>>>>>> 1342d9034355bc1e96062c7490f72f2a1e6bd2c6

import loadingGif from './assets/images/motor.gif';

function App() {
    const [loading, setLoading] = useState(true);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSignUpModal, setShowSignUpModal] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });
        return () => unsubscribe();
    }, []);

    const openLogin = () => {
        setShowLoginModal(true);
        setShowSignUpModal(false);
    };

    const openSignUp = () => {
        setShowSignUpModal(true);
        setShowLoginModal(false);
    };

    const closeModals = () => {
        setShowLoginModal(false);
        setShowSignUpModal(false);
    };

    return (
        <Router>
            <div>
                <NavBar 
                    openLogin={openLogin} 
                    openSignUp={openSignUp} 
                    currentUser={currentUser} 
                />

                <Routes>
                    <Route path="/" element={
                        <>
                            <Header openLogin={openLogin} />
                            <Info />
                        </>
                    } />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/maintenance-dashboard" element={<MDashboard />} />
<<<<<<< HEAD
                    <Route path="/tips" element={<Tips />} /> {/* ✅ Added tips route */}
=======
                    <Route path="/maintenance-logs" element={<MaintenanceLogs />} />

>>>>>>> 1342d9034355bc1e96062c7490f72f2a1e6bd2c6
                </Routes>

                <LoginModal 
                    show={showLoginModal} 
                    onClose={closeModals} 
                    onSwitch={openSignUp} 
                />
                <SignUpModal 
                    show={showSignUpModal} 
                    onClose={closeModals} 
                    onSwitch={openLogin} 
                />

                {loading && (
                    <div className="loading-screen">
                        <img src={loadingGif} alt="Loading..." className="loading-motor" />
                    </div>
                )}
            </div>
        </Router>
    );
}

export default App;
