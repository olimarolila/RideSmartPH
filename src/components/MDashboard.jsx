import React, { useState, useEffect } from "react";
import "../css/MDashboard.css";

function MDashboard() {
  const [maintenanceData, setMaintenanceData] = useState({
    changeOil: "",
    engineMaintenance: "",
    tireCheck: "",
  });

  const [currentMileage, setCurrentMileage] = useState("");
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem("maintenanceData");
    const savedMileage = localStorage.getItem("currentMileage");

    if (savedData) setMaintenanceData(JSON.parse(savedData));
    if (savedMileage) setCurrentMileage(savedMileage);

    setHasLoaded(true);
  }, []);

  useEffect(() => {
    if (hasLoaded) {
      localStorage.setItem("maintenanceData", JSON.stringify(maintenanceData));
      localStorage.setItem("currentMileage", currentMileage);
    }
  }, [maintenanceData, currentMileage, hasLoaded]);

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

  const clearAll = () => {
    localStorage.removeItem("maintenanceData");
    localStorage.removeItem("currentMileage");
    setMaintenanceData({
      changeOil: "",
      engineMaintenance: "",
      tireCheck: "",
    });
    setCurrentMileage("");
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">🛠 Maintenance Dashboard</h2>
      <p className="dashboard-subtitle">
        Enter your last maintenance and mileage to track your schedule.
      </p>

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
        <button onClick={clearAll} className="clear-button">🧹 Clear All</button>
        {/* <button onClick={() => window.print()} className="print-button">🖨️ Print</button> */}
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
