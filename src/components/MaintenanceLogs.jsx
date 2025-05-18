import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  collection, getDocs, query,
  orderBy, where
} from "firebase/firestore";

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

    // ✅ Apply date filters if provided
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999); // include full end day

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

  const formatDate = (timestamp) => {
    if (!timestamp?.toDate) return "Unknown";
    return timestamp.toDate().toLocaleString();
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">📜 Maintenance History</h2>
      <p className="dashboard-subtitle">Search or filter by date range.</p>

      {/* ✅ Filter Form */}
      <div className="maintenance-form" style={{ marginBottom: "1rem" }}>
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
        <button type="button" onClick={fetchHistory} className="save-button">
          🔍 Filter
        </button>
      </div>

      {history.length === 0 ? (
        <p>No history found.</p>
      ) : (
        <div className="schedule-list">
          {history.map((entry) => (
            <div key={entry.id} className="schedule-card card-default">
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
