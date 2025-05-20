import "../css/MaintenanceLogs.css";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { auth, db } from "../firebase";
import { collection, getDocs, query, orderBy, where, deleteDoc, doc } from "firebase/firestore";

function MaintenanceHistory() {
  const [history, setHistory] = useState([]);
  const [userId, setUserId] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) setUserId(user.uid);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (userId) fetchHistory();
  }, [userId]);

  const fetchHistory = async () => {
    if (!userId) return;

    const historyRef = collection(db, "maintenanceLogs", userId, "history");
    let q = query(historyRef, orderBy("savedAt", "desc"));

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);

      q = query(
        historyRef,
        where("savedAt", ">=", start),
        where("savedAt", "<=", end),
        orderBy("savedAt", "desc")
      );
    }

    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setHistory(data);
  };

  const clearHistory = async () => {
    if (!userId) return;

    const confirmClear = window.confirm("Are you sure you want to clear all history?");
    if (!confirmClear) return;

    try {
      const historyRef = collection(db, "maintenanceLogs", userId, "history");
      const snapshot = await getDocs(historyRef);

      const deletePromises = snapshot.docs.map((docSnap) =>
        deleteDoc(doc(db, "maintenanceLogs", userId, "history", docSnap.id))
      );

      await Promise.all(deletePromises);
      setHistory([]);
      toast.success("Maintenance history cleared successfully! 🗑️");
    } catch (error) {
      console.error("Error clearing history:", error);
      toast.error("Failed to clear history. Please try again.");
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp?.toDate) return "Unknown";
    return timestamp.toDate().toLocaleString();
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">📜 Maintenance History</h2>
      <p className="dashboard-subtitle">Search or filter by date range.</p>

      <div className="maintenance-form">
        <label>
          From:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <label>
          To:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
        <div className="button-group">
          <button onClick={fetchHistory} className="action-button">
            🔍 Filter
          </button>
          <button onClick={clearHistory} className="action-button clear-button">
            🗑️ Clear History
          </button>
        </div>
      </div>

      {history.length === 0 ? (
        <p>No history found.</p>
      ) : (
        <div className="schedule-list">
          {history.map((entry) => (
            <div key={entry.id} className="schedule-card">
              <p><strong>Date Saved:</strong> {formatDate(entry.savedAt)}</p>
              <p><strong>Change Oil:</strong> {entry.maintenanceData?.changeOil || "N/A"}</p>
              <p><strong>Engine Maintenance:</strong> {entry.maintenanceData?.engineMaintenance || "N/A"}</p>
              <p><strong>Tire Check:</strong> {entry.maintenanceData?.tireCheck || "N/A"}</p>
              <p><strong>Mileage:</strong> {entry.currentMileage || "N/A"} km</p>
            </div>
          ))}
        </div>
      )}

     
    </div>
  );
}

export default MaintenanceHistory;