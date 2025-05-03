import { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import Header from "./components/Header";
import Info from "./components/Info";
import LoginModal from "./components/LoginModal";  
import SignUpModal from "./components/SignUpModal"; 
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
    <>
      {/* Content always loads */}
      <NavBar openLogin={openLogin} openSignUp={openSignUp} />
      <Header openLogin={openLogin} />

      <Info />

      {/* Modals */}
      <LoginModal show={showLoginModal} onClose={closeModals} onSwitch={openSignUp} />
      <SignUpModal show={showSignUpModal} onClose={closeModals} onSwitch={openLogin} />

      {/* Loading overlay */}
      {loading && (
        <div className="loading-screen">
          <img src="src/assets/images/motor.gif" alt="Loading..." className="loading-motor" />
        </div>
      )}
    </>
  );
}

export default App;