// src/components/LogDisplay.js
import React, { useState, useEffect } from "react";
import { getLogs } from "../utils/inAppLogger";

const LogDisplay = () => {
  const [currentLogs, setCurrentLogs] = useState(getLogs());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLogs(getLogs());
    }, 1000); // Update logs every second
    return () => clearInterval(interval);
  }, []);

  const logContainerStyle = {
    position: "fixed",
    bottom: "10px",
    left: "10px",
    width: "calc(100% - 20px)",
    maxHeight: "200px",
    overflowY: "scroll",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    color: "#0f0",
    padding: "10px",
    zIndex: 9999,
    fontSize: "12px",
    border: "1px solid #333",
    borderRadius: "5px",
    fontFamily: "monospace",
  };

  return (
    <div style={logContainerStyle}>
      <h3>In-App Logs:</h3>
      {currentLogs.length === 0 && <p>No logs yet...</p>}
      {currentLogs.map((log, index) => (
        <div key={index}>{log}</div>
      ))}
    </div>
  );
};

export default LogDisplay;

