import { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import Header from "./components/Header";
import Info from "./components/Info";
import LoginModal from "./components/LoginModal";  
import SignUpModal from "./components/SignUpModal"; 
import loadingGif from './assets/images/motor.gif';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from "./pages/About"; 
import Dashboard from "./pages/Dashboard"; 

function App() {
    const [loading, setLoading] = useState(true);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSignUpModal, setShowSignUpModal] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
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
                <NavBar openLogin={openLogin} openSignUp={openSignUp} />

                <Routes>
                <Route path="/" element={
                    <>
                    <Header openLogin={openLogin} />
                    <Info />
                    </>
                } />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/about" element={<About />} />
                </Routes>

                <LoginModal show={showLoginModal} onClose={closeModals} onSwitch={openSignUp} />
                <SignUpModal show={showSignUpModal} onClose={closeModals} onSwitch={openLogin} />

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