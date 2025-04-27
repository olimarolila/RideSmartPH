import { useState, useEffect } from "react";
import NavBar from "./components/NavBar"; 
import Header from "./components/Header"; 

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Content always loads */}
      <NavBar />
      <Header />
      {/* Any other components */}

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
