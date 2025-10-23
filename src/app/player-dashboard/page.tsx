"use client";

import React, { useState } from "react";
import "./player-dashboard.css";
import LeaderBoard from "./LeaderBoard"; // make sure path is correct


const PlayerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"home" | "leaderboard" | "subscription">("home");
  const [loggedIn, setLoggedIn] = useState(true);

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => {
    setLoggedIn(false);
    window.location.href = "/";
  };

  if (!loggedIn) {
    return (
      <div className="logout-message">
        <h1>You have been logged out.</h1>
        <a href="/" className="logout-link">Return to Login</a>
      </div>
    );
  }

  return (
    <div className="player-dashboard">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <nav className="sidebar-nav">
          <button className={activeTab === "home" ? "active" : ""} onClick={() => setActiveTab("home")}>Home</button>
          <button className={activeTab === "leaderboard" ? "active" : ""} onClick={() => setActiveTab("leaderboard")}>Leader Board</button>
          <button className={activeTab === "subscription" ? "active" : ""} onClick={() => setActiveTab("subscription")}>Subscription</button>
          <button onClick={() => setShowLogoutConfirm(true)}>Logout</button>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="dashboard-main">
        {activeTab === "home" && (
          <section className="tab-content home-content">
            <h1>Welcome Back, Player!</h1>
            <p className="home-tagline">
              The world’s last defense isn’t a gun — it’s a line of code.
            </p>
            <div className="home-boxes">
              <div className="info-box">
                <h2>Current Level</h2>
                <p>12</p>
              </div>
              <div className="info-box">
                <h2>Rank</h2>
                <p>482</p>
              </div>
            </div>
          </section>
        )}

        {activeTab === "leaderboard" && (
          <section className="tab-content">
            <LeaderBoard />
          </section>
        )}{activeTab === "subscription" && (
  <section className="tab-content subscription-content">
    <h1>Upgrade Your Plan</h1>
    <p className="subscription-tagline">
      Choose the plan that fits your coding journey.
    </p>

    <div className="subscription-plans">
      {/* Free Plan */}
      <div className="plan-box">
        <h2 className="plan-title free">Free</h2>
        <p className="plan-subtitle">No credit card needed</p>
        <p className="plan-price">$0</p>
        <button className="current-plan-btn">Current Plan</button>
        <h3 className="plan-section-title">Essentials to get started:</h3>
        <ul className="plan-features">
          <li><span className="highlight">Limited</span> Access to levels</li>
          
        </ul>
      </div>

      {/* Pro Plan */}
      <div className="plan-box">
        <h2 className="plan-title pro">Pro</h2>
        <p className="plan-subtitle">Best for learning C#</p>
        <p className="plan-price">$15<span>/month</span></p>
        <button className="subscribe-btn">Subscribe Now</button>
        <button className="paypal-btn">Pay with PayPal</button>
        <h3 className="plan-section-title">Everything in Free, plus:</h3>
        <ul className="plan-features">
          <li>Access to all levels</li>
          <li><span className="highlight">Access</span> to Creative mode</li>
         
        </ul>
      </div>
    </div>
  </section>
)}

      </main>

      {/* Logout modal */}
      {showLogoutConfirm && (
        <div className="logout-confirm-overlay">
          <div className="logout-confirm-box">
            <h2>Are you sure you want to log out?</h2>
            <div className="logout-buttons">
              <button className="confirm-yes" onClick={handleLogout}>Yes</button>
              <button className="confirm-no" onClick={() => setShowLogoutConfirm(false)}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerDashboard;
