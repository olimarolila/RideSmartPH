import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

// Components
import NavBar from "./components/NavBar";
import Header from "./components/Header";
import Info from "./components/Info";
import Footer from "./components/Footer";
import LoginModal from "./components/LoginModal";  
import SignUpModal from "./components/SignUpModal"; 
import About from "./pages/About"; 
import Motorcycles from "./pages/Motorcycles"; 
import MDashboard from "./components/MDashboard";
import MaintenanceLogs from "./components/MaintenanceLogs";
import Tips from "./components/Tips";



import loadingGif from './assets/images/motor.gif';

function App() {
    const [loading, setLoading] = useState(true);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSignUpModal, setShowSignUpModal] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    // Simulated loading effect
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    // Firebase auth listener
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
                    <Route path="/motorcycles" element={<Motorcycles />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/maintenance-dashboard" element={<MDashboard />} />
                    <Route path="/maintenance-logs" element={<MaintenanceLogs />} />
                    <Route path="/tips" element={<Tips />} />

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
