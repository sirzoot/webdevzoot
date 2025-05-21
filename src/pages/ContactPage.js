import React, { useState, useEffect } from "react";
import "./ContactPage.css"; // CSS for styling
import { addLog } from "../utils/inAppLogger"; // Import the logger

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    addLog("ContactPage: Mounted");
    return () => {
      addLog("ContactPage: Unmounted");
    };
  }, []);

  useEffect(() => {
    addLog(`ContactPage: formData state changed: ${JSON.stringify(formData)}`);
  }, [formData]);

  useEffect(() => {
    addLog(`ContactPage: isSubmitted state changed to: ${isSubmitted}`);
  }, [isSubmitted]);

  useEffect(() => {
    addLog(`ContactPage: submitError state changed to: ${submitError}`);
  }, [submitError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    addLog(`ContactPage: handleChange called for ${name} with value: ${value}`);
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    addLog("ContactPage: handleSubmit called.");
    setIsSubmitted(false);
    setSubmitError("");

    if (!formData.name || !formData.email || !formData.message) {
      addLog("ContactPage: Form validation failed - required fields missing.");
      setSubmitError("Please fill in all required fields (Name, Email, Message).");
      return;
    }

    try {
      addLog(`ContactPage: Attempting to submit form data: ${JSON.stringify(formData)}`);
      const response = await fetch("http://localhost:5000/submit_contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        addLog("ContactPage: Form submission successful: " + JSON.stringify(result));
        setIsSubmitted(true);
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        const errorResult = await response.json();
        addLog("ContactPage: Form submission error: " + JSON.stringify(errorResult));
        setSubmitError(errorResult.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      addLog("ContactPage: Network or other error during submission: " + error.toString());
      setSubmitError("Failed to send message. Please check your connection and try again.");
    }
  };
  
  addLog("ContactPage: Rendering");

  return (
    <div className="contact-page">
      <section className="contact-header-section">
        <h1>Let’s Talk</h1>
        <p>Have questions or ready to start your real estate journey? We\'re here to help. Real people. Fast response.</p>
      </section>

      <section className="contact-form-section">
        <h2>Send Us a Message</h2>
        {isSubmitted && (
          <div className="submission-success-message">
            <p>Thank you for your message! We\'ve received it and will get back to you shortly.</p>
            <p>In the meantime, feel free to <a href="/listings">explore our listings</a>.</p>
          </div>
        )}
        {!isSubmitted && (
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Name*</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Your Full Name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email*</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="your.email@example.com" required />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone (Optional)</label>
              <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="(555) 123-4567" />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message*</label>
              <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows="6" placeholder="How can we help you today?" required></textarea>
            </div>
            {submitError && <p className="submission-error-message">{submitError}</p>}
            <button type="submit" className="submit-button">Send Message</button>
          </form>
        )}
      </section>

      <section className="contact-info-section">
        <h2>Contact Information</h2>
        <div className="info-items-container">
          <div className="info-item">
            <span className="info-icon">📞</span> 
            <a href="tel:+15551234567">+1 (555) 123-4567</a>
          </div>
          <div className="info-item">
            <span className="info-icon">✉️</span>
            <a href="mailto:info@showcaserealestategroup.com">info@showcaserealestategroup.com</a>
          </div>
          <div className="info-item">
            <span className="info-icon">📍</span>
            <p>123 Luxury Avenue, Beverly Hills, CA 90210</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;

