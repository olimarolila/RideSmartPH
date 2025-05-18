import React, { useEffect, useState, useRef } from "react";
import "../css/MDashboard.css";
import { auth, db } from "../firebase";
import {
  doc,
  getDoc,
  setDoc,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

function MDashboard() {
  const [maintenanceData, setMaintenanceData] = useState({
    changeOil: "",
    engineMaintenance: "",
    tireCheck: "",
  });

  const [currentMileage, setCurrentMileage] = useState("");
  const [userId, setUserId] = useState(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const mileageWarningShown = useRef(false);

  // ✅ Load user and dashboard data safely
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);

        const fetchData = async () => {
          try {
            const docRef = doc(db, "maintenanceLogs", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              const data = docSnap.data();
              setMaintenanceData(data.maintenanceData || {});
              setCurrentMileage(data.currentMileage || "");
            }
          } catch (error) {
            toast.error("❌ Failed to load data.");
          } finally {
            setIsInitialLoad(false);
          }
        };

        fetchData();
      } else {
        setIsInitialLoad(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // ✅ Show toast warning when nearing 5000km
  useEffect(() => {
    const value = Number(currentMileage);

    if (value >= 4000 && value < 5000 && !mileageWarningShown.current) {
      toast.warning("⚠️ You're nearing 5000km. Prepare for oil change!");
      mileageWarningShown.current = true;
    }

    if (value < 4000 && mileageWarningShown.current) {
      mileageWarningShown.current = false;
    }
  }, [currentMileage]);

  // ✅ Save data and log to history
  const handleSave = async () => {
    if (!userId || isInitialLoad) return;

    try {
      const payload = {
        maintenanceData,
        currentMileage,
      };

      await setDoc(doc(db, "maintenanceLogs", userId), payload);

      await addDoc(collection(db, "maintenanceLogs", userId, "history"), {
        ...payload,
        savedAt: serverTimestamp(),
      });

      toast.success("✅ Saved successfully!");
    } catch (error) {
      toast.error("❌ Failed to save.");
      console.error("Save error:", error);
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
    return nextDate && nextDate < new Date();
  };

  const getCardClass = (nextDate) => {
    if (!nextDate) return "card-default";
    const today = new Date();
    const diff = (nextDate - today) / (1000 * 60 * 60 * 24);
    if (diff < 0) return "card-red";
    if (diff < 7) return "card-yellow";
    return "card-green";
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
          <circle cx="18" cy="18" r="16" fill="none" stroke="#eee" strokeWidth="3" />
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
              {isOverdue(nextDate) && (
                <span className="overdue-warning"> 🔴 Overdue!</span>
              )}
            </p>
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
        toast.info("🧹 Data cleared.");
      } catch (error) {
        toast.error("❌ Failed to clear.");
        console.error("Clear error:", error);
      }
    }
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">🛠 Maintenance Dashboard</h2>
      <p className="dashboard-subtitle">
        Enter your last maintenance and mileage to track your schedule.
      </p>

      <form className="maintenance-form">
        <label>Last Change Oil:
          <input
            type="date"
            name="changeOil"
            value={maintenanceData.changeOil}
            onChange={handleChange}
          />
        </label>
        <label>Last Engine Maintenance:
          <input
            type="date"
            name="engineMaintenance"
            value={maintenanceData.engineMaintenance}
            onChange={handleChange}
          />
        </label>
        <label>Last Tire Check:
          <input
            type="date"
            name="tireCheck"
            value={maintenanceData.tireCheck}
            onChange={handleChange}
          />
        </label>
        <label>Current Mileage (in km):
          <input
            type="number"
            name="currentMileage"
            value={currentMileage}
            onChange={handleMileageChange}
          />
        </label>
      </form>

      <div className="button-row">
        <button type="button" onClick={handleSave} className="save-button">💾 Save</button>
        <button type="button" onClick={clearAll} className="clear-button">🧹 Clear All</button>
        <Link to="/maintenance-logs" className="history-button">📜 View History</Link>
      </div>

      <div className="schedule-list">
        {renderTask("Change Oil", "changeOil", 3)}
        {renderTask("Engine Maintenance", "engineMaintenance", 6)}
        {renderTask("Tire Check", "tireCheck", 2)}
      </div>

      <ToastContainer />
    </div>
  );
}

export default MDashboard;
