import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import '../css/Motor.css';


function MotorcycleSpecs() {
  const [motorcycles, setMotorcycles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [brand, setBrand] = useState("Yamaha");
  const [savedBikes, setSavedBikes] = useState([]);

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

  useEffect(() => {
    const loadSavedBikes = async () => {
      try {
        const snapshot = await getDocs(collection(db, "saved_motorcycles"));
        const saved = snapshot.docs.map(doc => doc.data());
        setSavedBikes(saved);
      } catch (error) {
        console.error("Error loading saved motorcycles:", error);
      }
    };

    loadSavedBikes();
  }, []);

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
    if (isSaved(bike)) {
      alert("Already saved!");
      return;
    }

    try {
      await addDoc(collection(db, "saved_motorcycles"), bike);
      setSavedBikes((prev) => [...prev, bike]);
    } catch (error) {
      console.error("Error saving motorcycle:", error);
      alert("Failed to save. Please try again.");
    }
  };

  return (
    <div className="container motorcycle-container">
      <h2>Motorcycle Specs for "{brand}"</h2>

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
        motorcycles.map((bike, index) => {
          const saved = isSaved(bike);

          return (
            <div key={index} className="card motorcycle-card">
              <i
                className={`bi ${saved ? "bi-bookmark-fill" : "bi-bookmark"} bookmark-icon ${saved ? "saved" : ""}`}
                onClick={() => !saved && handleSave(bike)}
                title={saved ? "Saved" : "Save to Firebase"}
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
    </div>
  );
}

export default MotorcycleSpecs;
