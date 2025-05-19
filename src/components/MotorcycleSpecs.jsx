import { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import '../css/Motor.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { deleteDoc, doc } from "firebase/firestore"; // 🔺 Add to imports


function MotorcycleSpecs() {
  const [motorcycles, setMotorcycles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [brand, setBrand] = useState("Yamaha");
  const [savedBikes, setSavedBikes] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedBike, setSelectedBike] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(motorcycles.length / itemsPerPage);
  const paginatedMotorcycles = motorcycles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) loadSavedBikes(user.uid);
    });
    return () => unsubscribe();
  }, []);

  const loadSavedBikes = async (uid) => {
    try {
      const snapshot = await getDocs(collection(db, `users/${uid}/saved_motorcycles`));
      const saved = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSavedBikes(saved);
    } catch (error) {
      console.error("Error loading saved motorcycles:", error);
    }
  };

  const isSaved = (bike) => {
    return savedBikes.some(
      (b) =>
        b.make === bike.make &&
        b.model === bike.model &&
        b.year === bike.year &&
        b.engine === bike.engine
    );
  };

  const handleSave = async (bike) => {
  if (!currentUser) {
    toast.warn("Please log in to save a bookmark.");
    return;
  }

  if (isSaved(bike)) {
    toast.info("Already bookmarked.");
    return;
  }

  try {
    await addDoc(collection(db, `users/${currentUser.uid}/saved_motorcycles`), bike);
    setSavedBikes((prev) => [...prev, bike]);
    toast.success(`${bike.make} ${bike.model} bookmarked!`);
  } catch (error) {
    console.error("Error saving motorcycle:", error);
    toast.error("Failed to save. Please try again.");
  }
};

const handleRemove = async (bike) => {
  try {
    const match = savedBikes.find(
      (b) =>
        b.make === bike.make &&
        b.model === bike.model &&
        b.year === bike.year &&
        b.engine === bike.engine
    );

    if (!match) return;

    await deleteDoc(doc(db, `users/${currentUser.uid}/saved_motorcycles/${match.id}`));

    setSavedBikes((prev) =>
      prev.filter(
        (b) =>
          !(b.make === bike.make &&
            b.model === bike.model &&
            b.year === bike.year &&
            b.engine === bike.engine)
      )
    );

    toast.info(`${bike.make} ${bike.model} removed from bookmarks.`);
  } catch (error) {
    console.error("Error removing motorcycle:", error);
    toast.error("Failed to remove bookmark.");
  }
};


  const handleCardClick = (bike) => {
    setSelectedBike(bike);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedBike(null);
  };

  useEffect(() => {
    const fetchMotorcycles = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.api-ninjas.com/v1/motorcycles?make=${brand}`,
          {
            headers: {
              'X-Api-Key': 'KkvMqe5Wuu+EKuuaCzFK5w==Z5LYVswitw5RWktW'
            }
          }
        );
        const data = await response.json();
        setMotorcycles(data);
      } catch (error) {
        console.error("Error fetching motorcycle data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMotorcycles();
  }, [brand]);

  return (
    <div className="container motorcycle-container">
      <div style={{ textAlign: "center", marginBottom: "-80px" }}>
        <img src="src/assets/images/motor_search.png" alt="" height={350} />
      </div>


      <h2>Motorcycle Specs for "{brand}"</h2>


      <div className="row mt-4">
        {/* Left: Motorcycle Search Results */}
        <div className="col-md-8">
      <input
        type="text"
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
        placeholder="Enter motorcycle brand"
        className="form-control motorcycle-input"
      />
          {loading ? (
            <p>Loading...</p>
          ) : motorcycles.length > 0 ? (
            paginatedMotorcycles.map((bike, index) => {
              const saved = isSaved(bike);
              return (
                <div key={index} className="card motorcycle-card" onClick={() => handleCardClick(bike)}>
                  <i
                  className={`bi ${saved ? "bi-bookmark-fill" : "bi-bookmark"} bookmark-icon ${saved ? "saved" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    saved ? handleRemove(bike) : handleSave(bike);
                  }}
                  title={saved ? "Remove bookmark" : "Save to bookmarks"}
                ></i>

                  <h4>{bike.make} {bike.model}</h4>
                  <p><strong>Year:</strong> {bike.year}</p>
                  <p><strong>Engine:</strong> {bike.engine}</p>
                  <p><strong>Type:</strong> {bike.type}</p>
                </div>
              );
            })
          ) : (
            <p>No motorcycles found for "{brand}"</p>
          )}
          <div className="pagination mt-3">
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          className={`page-btn ${currentPage === i + 1 ? "active" : ""}`}
          onClick={() => setCurrentPage(i + 1)}
        >
          {i + 1}
        </button>
      ))}
    </div>

        </div>

        {/* Right: Bookmarked Bikes */}
        <div className="col-md-4">
          <h4>Bookmarked Models</h4>
          {savedBikes.length > 0 ? (
            savedBikes.map((bike, index) => (
              <div key={index} className="card motorcycle-card bookmarked">
                <div className="d-flex justify-content-between align-items-start">
                  <div onClick={() => handleCardClick(bike)} style={{ cursor: 'pointer' }}>
                    <h5 className="mb-1">{bike.make} {bike.model}</h5>
                    <p className="mb-0"><strong>Year:</strong> {bike.year}</p>
                  </div>
                  <i
                    className="bi bi-x-circle text-danger ms-2"
                    style={{ fontSize: '1.2rem', cursor: 'pointer' }}
                    title="Remove bookmark"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(bike);
                    }}
                  ></i>
                </div>
              </div>
              
            ))
          ) : (
            <p className="text-muted">No bookmarks yet</p>
          )}

        </div>
      </div>

      {/* Modal */}
      {showModal && selectedBike && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={closeModal}>×</button>
            <h3>{selectedBike.make} {selectedBike.model}</h3>
            <p><strong>Year:</strong> {selectedBike.year || "N/A"}</p>
            <p><strong>Engine:</strong> {selectedBike.engine || "N/A"}</p>
            <p><strong>Type:</strong> {selectedBike.type || "N/A"}</p>
            <p><strong>Displacement:</strong> {selectedBike.displacement || "N/A"}</p>
            <p><strong>Power:</strong> {selectedBike.power || "N/A"}</p>
            <p><strong>Torque:</strong> {selectedBike.torque || "N/A"}</p>
            <p><strong>Top Speed:</strong> {selectedBike.top_speed || "N/A"}</p>
            <p><strong>Fuel Capacity:</strong> {selectedBike.fuel_capacity || "N/A"}</p>
          </div>
        </div>
      )}
    <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}


export default MotorcycleSpecs;
