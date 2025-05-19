import "./index.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { ToastContainer } from 'react-toastify';
import "./index.css";

import About from "./pages/About"; 
import CostTracker from "./components/CostTracker";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Info from "./components/Info";
import LoginModal from "./components/LoginModal";  
import MaintenanceLogs from "./components/MaintenanceLogs";
import Motorcycles from "./pages/Motorcycles"; 
import MDashboard from "./components/MDashboard";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/ProtectedRoute";
import SignUpModal from "./components/SignUpModal"; 
import Tips from "./components/Tips";

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
                        <div className="backgroundImg">
                            <Header openLogin={openLogin} />
                            <Info />
                        </div>
                    } />

                    <Route path="/about" element={<About />} />
                    <Route path="/tips" element={<Tips />} />

                    <Route path="/motorcycles" element={
                        <ProtectedRoute>
                            <Motorcycles />
                        </ProtectedRoute>
                    } />

                    <Route path="/maintenance-dashboard" element={
                        <ProtectedRoute>
                            <MDashboard />
                        </ProtectedRoute>
                    } />

                    <Route path="/maintenance-logs" element={
                        <ProtectedRoute>
                            <MaintenanceLogs />
                        </ProtectedRoute>
                    } />

                    <Route path="/cost-tracker" element={
                        <ProtectedRoute>
                            <CostTracker />
                        </ProtectedRoute>
                    } />
                </Routes>

                <Footer />

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