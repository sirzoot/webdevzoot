import React, { useEffect, useState, useRef } from "react";
import "./Preloader.css";
import logo from "../assets/logo.png"; // Restored logo import
import { addLog } from "../utils/inAppLogger";

let effectInstanceCounter = 0;

const Preloader = ({ onLoaded }) => {
  addLog("Preloader.js: FUNCTION BODY EXECUTED. Props received: onLoaded type = " + typeof onLoaded);

  const [loading, setLoading] = useState(true);
  const effectIdRef = useRef(null);

  useEffect(() => {
    effectInstanceCounter++;
    effectIdRef.current = effectInstanceCounter;
    const currentEffectId = effectIdRef.current;

    addLog(`Preloader.js (Effect ID: ${currentEffectId}): useEffect for timer - MOUNTED.`);
    addLog(`Preloader.js (Effect ID: ${currentEffectId}): Initial onLoaded prop type: ${typeof onLoaded}, value: ${String(onLoaded)}`);

    addLog(`Preloader.js (Effect ID: ${currentEffectId}): About to schedule setTimeout.`);
    const timerId = setTimeout(() => {
      addLog(`Preloader.js (Effect ID: ${currentEffectId}, Timer ID: ${timerId}): setTimeout CALLBACK ENTERED.`);
      addLog(`Preloader.js (Effect ID: ${currentEffectId}, Timer ID: ${timerId}): Setting loading to false NOW.`);
      setLoading(false);
      if (typeof onLoaded === "function") {
        addLog(`Preloader.js (Effect ID: ${currentEffectId}, Timer ID: ${timerId}): onLoaded IS a function. Calling onLoaded() NOW.`);
        onLoaded();
        addLog(`Preloader.js (Effect ID: ${currentEffectId}, Timer ID: ${timerId}): onLoaded() has been CALLED.`);
      } else {
        addLog(`Preloader.js (Effect ID: ${currentEffectId}, Timer ID: ${timerId}): onLoaded is NOT a function. Type: ${typeof onLoaded}. CANNOT CALL.`);
      }
      addLog(`Preloader.js (Effect ID: ${currentEffectId}, Timer ID: ${timerId}): setTimeout CALLBACK FINISHED.`);
    }, 2000); // 2-second preloader duration

    addLog(`Preloader.js (Effect ID: ${currentEffectId}): Timer with ID ${timerId} SCHEDULED.`);

    return () => {
      addLog(`Preloader.js (Effect ID: ${currentEffectId}): useEffect for timer - CLEANUP. Attempting to clear timer ID: ${timerId}.`);
      clearTimeout(timerId);
      addLog(`Preloader.js (Effect ID: ${currentEffectId}): Timer with ID ${timerId} CLEARED.`);
    };
  }, []); // Keep empty dependency array for one-time timer setup

  useEffect(() => {
    addLog(`Preloader.js (Effect ID: ${effectIdRef.current}): useEffect for loading state - loading changed to: ${loading}`);
  }, [loading]);

  addLog(`Preloader.js (Effect ID: ${effectIdRef.current}): Rendering with loading: ${loading}`);

  return (
    <div className={`preloader ${!loading ? "fade-out" : ""}`}>
      <img src={logo} alt="Showcase Real Estate Group Logo" className="preloader-logo" /> {/* Restored logo usage */}
      {/* <p style={{color: "white", fontSize: "24px", textAlign: "center", paddingTop: "40vh"}}>Loading...</p> */}
    </div>
  );
};

export default Preloader;

