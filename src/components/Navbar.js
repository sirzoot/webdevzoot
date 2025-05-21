import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/logo.png"; // Path to the logo
import { addLog } from "../utils/inAppLogger"; // Import addLog

const Navbar = ({ preloaderFinished }) => {
  const [scrolled, setScrolled] = useState(false);
  const [logoVisible, setLogoVisible] = useState(preloaderFinished);
  const location = useLocation();

  useEffect(() => {
    addLog("Navbar.js: Component did mount or preloaderFinished changed.");
    if (preloaderFinished) {
      addLog("Navbar.js: preloaderFinished is true, setting timer for logo visibility.");
      const timer = setTimeout(() => {
        addLog("Navbar.js: Timer expired, setting logoVisible to true.");
        setLogoVisible(true);
      }, 300); 
      return () => {
        addLog("Navbar.js: Cleanup from preloaderFinished effect, clearing timer.");
        clearTimeout(timer);
      };
    } else {
      addLog("Navbar.js: preloaderFinished is false, setting logoVisible to false.");
      setLogoVisible(false);
    }
  }, [preloaderFinished]);

  useEffect(() => {
    addLog("Navbar.js: Component did mount for scroll handler.");
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      addLog("Navbar.js: Component will unmount, removing scroll listener.");
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    addLog(`Navbar.js: scrolled state changed to: ${scrolled}`);
  }, [scrolled]);

  useEffect(() => {
    addLog(`Navbar.js: logoVisible state changed to: ${logoVisible}`);
  }, [logoVisible]);
  
  useEffect(() => {
    addLog(`Navbar.js: location.pathname changed to: ${location.pathname}`);
  }, [location.pathname]);

  const getLinkClass = (path) => {
    return location.pathname === path ? "nav-link active" : "nav-link";
  };

  addLog(`Navbar.js: Rendering with preloaderFinished: ${preloaderFinished}, logoVisible: ${logoVisible}, scrolled: ${scrolled}`);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""} ${logoVisible ? "logo-visible" : ""}`}>
      <div className="navbar-logo-container">
        {logoVisible && (
          <Link to="/" className="navbar-logo-link">
            <img src={logo} alt="Showcase Real Estate Group Logo" className="navbar-logo" />
          </Link>
        )}
      </div>
      <div className="nav-links">
        <Link to="/" className={getLinkClass("/")}>Home</Link>
        <Link to="/listings" className={getLinkClass("/listings")}>Listings</Link>
        <Link to="/about" className={getLinkClass("/about")}>About Us</Link>
        <Link to="/contact" className={getLinkClass("/contact")}>Contact</Link>
      </div>
    </nav>
  );
};

export default Navbar;

