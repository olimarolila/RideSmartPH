import React, { useEffect, useState } from "react";
import "../css/MDashboard.css";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

function MDashboard() {
  const [maintenanceData, setMaintenanceData] = useState({
    changeOil: "",
    engineMaintenance: "",
    tireCheck: "",
  });

  const [currentMileage, setCurrentMileage] = useState("");
  const [userId, setUserId] = useState(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");

  // Load user and data from Firestore
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      console.log("🔑 Auth state changed. User:", user);
      if (user) {
        setUserId(user.uid);
        try {
          const docRef = doc(db, "maintenanceLogs", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            console.log("📥 Loaded from Firestore:", data);
            setMaintenanceData(data.maintenanceData || {});
            setCurrentMileage(data.currentMileage || "");
          } else {
            console.log("ℹ️ No data found for user in Firestore.");
          }
        } catch (error) {
          console.error("❌ Error loading data from Firestore:", error);
        } finally {
          setIsInitialLoad(false);
        }
      } else {
        console.warn("⚠️ No user is logged in.");
        setIsInitialLoad(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // 🔘 Manual save to Firestore when Save button is clicked
  const handleSave = async () => {
    if (!userId || isInitialLoad) return;

    try {
      const payload = {
        maintenanceData,
        currentMileage,
      };
      console.log("📤 Saving to Firestore:", payload);
      await setDoc(doc(db, "maintenanceLogs", userId), payload);
      console.log("✅ Data saved successfully to Firestore.");

      // ✅ Show success message
      setSuccessMessage("✅ Saved successfully!");
      setTimeout(() => setSuccessMessage(""), 3000); // Auto-hide after 3s
    } catch (error) {
      console.error("❌ Error saving data to Firestore:", error);
    }
  };

  const handleChange = (e) => {
    setMaintenanceData({
      ...maintenanceData,
      [e.target.name]: e.target.value,
    });
  };

  const handleMileageChange = (e) => {
    setCurrentMileage(e.target.value);
  };

  const calculateNextDate = (lastDate, monthsToAdd) => {
    if (!lastDate) return null;
    const date = new Date(lastDate);
    date.setMonth(date.getMonth() + monthsToAdd);
    return date;
  };

  const isOverdue = (nextDate) => {
    if (!nextDate) return false;
    const today = new Date();
    return nextDate < today;
  };

  const getCardClass = (nextDate) => {
    if (!nextDate) return "card-default";
    const today = new Date();
    const diff = (nextDate - today) / (1000 * 60 * 60 * 24);
    if (diff < 0) return "card-red";
    if (diff < 7) return "card-yellow";
    return "card-green";
  };

  const getDaysRemaining = (nextDate) => {
    if (!nextDate) return "N/A";
    const today = new Date();
    const diff = Math.ceil((nextDate - today) / (1000 * 60 * 60 * 24));
    return diff < 0 ? "Overdue" : `${diff} day(s) remaining`;
  };

  const getMileageColor = (value) => {
    if (value <= 2500) return "#00c8ff";
    if (value <= 4000) return "#ffc107";
    return "#ff4d4f";
  };

  const renderMileageArc = () => {
    const value = Number(currentMileage);
    const percent = Math.min((value / 5000) * 100, 100);
    const strokeDasharray = `${percent} ${100 - percent}`;
    const color = getMileageColor(value);

    return (
      <div className="mileage-arc">
        <svg width="100" height="100" viewBox="0 0 36 36">
          <circle
            cx="18"
            cy="18"
            r="16"
            fill="none"
            stroke="#eee"
            strokeWidth="3"
          />
          <circle
            cx="18"
            cy="18"
            r="16"
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeDasharray={strokeDasharray}
            strokeDashoffset="25"
            transform="rotate(-90 18 18)"
          />
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="6"
            fill={color}
          >
            {value}km
          </text>
        </svg>
        {value >= 5000 && (
          <p className="overdue-warning">🔧 Over 5000km – change oil now!</p>
        )}
      </div>
    );
  };

  const renderTask = (label, key, months) => {
    const lastDate = maintenanceData[key];
    const nextDate = calculateNextDate(lastDate, months);
    const nextDateString = nextDate ? nextDate.toISOString().split("T")[0] : "N/A";

    return (
      <div className={`schedule-card ${getCardClass(nextDate)}`} key={key}>
        <div className="card-flex">
          <div className="card-left">
            <h3 className="task-type">{label}</h3>
            <p>Last: {lastDate || "Not Set"}</p>
            <p>
              Next: {nextDateString}
              {nextDate && isOverdue(nextDate) && (
                <span className="overdue-warning"> 🔴 Overdue!</span>
              )}
            </p>
            <p className="countdown">{nextDate ? getDaysRemaining(nextDate) : ""}</p>
          </div>
          {key === "changeOil" && currentMileage && (
            <div className="card-right">{renderMileageArc()}</div>
          )}
        </div>
      </div>
    );
  };

  const clearAll = async () => {
    setMaintenanceData({
      changeOil: "",
      engineMaintenance: "",
      tireCheck: "",
    });
    setCurrentMileage("");
    if (userId) {
      try {
        await setDoc(doc(db, "maintenanceLogs", userId), {
          maintenanceData: {},
          currentMileage: "",
        });
        console.log("🧹 Cleared data in Firestore.");
        setSuccessMessage("🧹 Data cleared.");
        setTimeout(() => setSuccessMessage(""), 3000);
      } catch (error) {
        console.error("❌ Error clearing Firestore data:", error);
      }
    }
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">🛠 Maintenance Dashboard</h2>
      <p className="dashboard-subtitle">
        Enter your last maintenance and mileage to track your schedule.
      </p>

      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}

      <form className="maintenance-form">
        <label>
          Last Change Oil:
          <input
            type="date"
            name="changeOil"
            value={maintenanceData.changeOil}
            onChange={handleChange}
          />
        </label>
        <label>
          Last Engine Maintenance:
          <input
            type="date"
            name="engineMaintenance"
            value={maintenanceData.engineMaintenance}
            onChange={handleChange}
          />
        </label>
        <label>
          Last Tire Check:
          <input
            type="date"
            name="tireCheck"
            value={maintenanceData.tireCheck}
            onChange={handleChange}
          />
        </label>
        <label>
          Current Mileage (in km):
          <input
            type="number"
            name="currentMileage"
            value={currentMileage}
            onChange={handleMileageChange}
            placeholder="Enter current mileage"
          />
        </label>
      </form>

      <div className="button-row">
        <button onClick={handleSave} className="save-button">💾 Save</button>
        <button onClick={clearAll} className="clear-button">🧹 Clear All</button>
      </div>

      <div className="schedule-list">
        {renderTask("Change Oil", "changeOil", 3)}
        {renderTask("Engine Maintenance", "engineMaintenance", 6)}
        {renderTask("Tire Check", "tireCheck", 2)}
      </div>
    </div>
  );
}

export default MDashboard;
