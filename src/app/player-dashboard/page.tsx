"use client";

import React, { useState } from "react";
import "./player-dashboard.css";

const PlayerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "progress" | "inventory" | "stats" | "settings"
  >("progress");

  // Simulated login state
  const [loggedIn, setLoggedIn] = useState(true);
  const [playerName] = useState("CodeMaster");

  // Handle logout
  const handleLogout = () => {
    setLoggedIn(false);
    window.location.href = "/"; // redirect to home/login page
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
        <div className="player-info">
          <img
            src="/codemaster.png"
            alt="Player Avatar"
            className="player-avatar"
          />
          <p className="player-name">{playerName}</p>
          <p className="player-level">Level 12</p>
        </div>

        <nav className="sidebar-nav">
          <button
            className={activeTab === "progress" ? "active" : ""}
            onClick={() => setActiveTab("progress")}
          >
            Progress
          </button>
          <button
            className={activeTab === "inventory" ? "active" : ""}
            onClick={() => setActiveTab("inventory")}
          >
            Inventory
          </button>
          <button
            className={activeTab === "stats" ? "active" : ""}
            onClick={() => setActiveTab("stats")}
          >
            Statistics
          </button>
          <button
            className={activeTab === "settings" ? "active" : ""}
            onClick={() => setActiveTab("settings")}
          >
            Settings
          </button>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="dashboard-main">
        {activeTab === "progress" && (
          <section className="tab-content">
            <h1>Mission Progress</h1>
            <p>Your journey through the digital realm continues...</p>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: "68%" }}></div>
            </div>
          </section>
        )}

        {activeTab === "inventory" && (
          <section className="tab-content">
            <h1>Inventory</h1>
            <div className="inventory-grid">
              <div className="item-card"> Sword of Code</div>
              <div className="item-card"> Debugger Tool</div>
              <div className="item-card"> AI Core Fragment</div>
              <div className="item-card"> Energy Cell</div>
            </div>
          </section>
        )}

        {activeTab === "stats" && (
          <section className="tab-content">
            <h1>Player Stats</h1>
            <ul className="stats-list">
              <li><strong>Level:</strong> 12</li>
              <li><strong>XP:</strong> 8,640</li>
              <li><strong>Health:</strong> 92%</li>
              <li><strong>Energy:</strong> 78%</li>
              <li><strong>Code Efficiency:</strong> 95%</li>
            </ul>
          </section>
        )}

        {activeTab === "settings" && (
          <section className="tab-content">
            <h1>Settings</h1>
            <div className="settings-options">
              <button className="settings-btn">Change Avatar</button>
              <button className="settings-btn">Game Preferences</button>
              <button className="logout-btn" onClick={handleLogout}>
                Log Out
              </button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default PlayerDashboard;
