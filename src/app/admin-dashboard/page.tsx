"use client";

import React, { useState } from "react";
import "./admin-dashboard.css";
import { useRouter } from "next/navigation";

interface Player {
  id: number;
  name: string;
  email: string;
  status: "active" | "banned";
}

interface Purchase {
  id: number;
  player: string;
  method: "PayPal" | "GCash";
  amount: number;
  date: string;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "players" | "feedbacks" | "purchases"
  >("dashboard");
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const router = useRouter();

  const [players, setPlayers] = useState<Player[]>([
    { id: 1, name: "Allen", email: "allen@example.com", status: "active" },
    { id: 2, name: "Bea", email: "bea@example.com", status: "active" },
    { id: 3, name: "Carl", email: "carl@example.com", status: "banned" },
  ]);

  const [purchases] = useState<Purchase[]>([
    { id: 1, player: "Allen", method: "PayPal", amount: 299, date: "2025-10-07" },
    { id: 2, player: "Bea", method: "GCash", amount: 149, date: "2025-09-30" },
  ]);

  const handleLogout = () => {
    setShowLogoutConfirm(false);
    router.push("/");
  };

  return (
    <div className="admin-dashboard">
      {/* ✅ Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">Admin Panel</h2>
        <nav>
          <button
            className={activeTab === "dashboard" ? "active" : ""}
            onClick={() => setActiveTab("dashboard")}
          >
            Home
          </button>

          <button
            className={activeTab === "players" ? "active" : ""}
            onClick={() => setActiveTab("players")}
          >
            Manage Players
          </button>

          <button
            className={activeTab === "feedbacks" ? "active" : ""}
            onClick={() => setActiveTab("feedbacks")}
          >
            Feedbacks
          </button>

          <button
            className={activeTab === "purchases" ? "active" : ""}
            onClick={() => setActiveTab("purchases")}
          >
            Purchases
          </button>

          <button
            className="logout-btn"
            onClick={() => setShowLogoutConfirm(true)}
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* ✅ Main Content */}
      <main className="main-content">
        {activeTab === "dashboard" && (
          <section>
            <h1>Dashboard Overview</h1>
            <div className="stats-cards">
              <div className="stat-card">
                <h3>Total Players</h3>
                <p>{players.length}</p>
              </div>
              <div className="stat-card">
                <h3>Banned Players</h3>
                <p>{players.filter(p => p.status === "banned").length}</p>
              </div>
              <div className="stat-card">
                <h3>Total Purchases</h3>
                <p>{purchases.length}</p>
              </div>
            </div>
          </section>
        )}

        {activeTab === "players" && (
          <section>
            <h1>Manage Players</h1>
            <p>(your players table stays here)</p>
          </section>
        )}

        {/* ✅ NEW FEEDBACKS TAB */}
        {activeTab === "feedbacks" && (
          <section>
            <h1>User Feedbacks</h1>
            <p>Later we will fetch data from Firestore here ✅</p>
          </section>
        )}

        {activeTab === "purchases" && (
          <section>
            <h1>Player Purchases</h1>
            <p>(your purchases table stays here)</p>
          </section>
        )}
      </main>

      {/* ✅ Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="popup-overlay">
          <div className="popup-glass">
            <h2>Confirm Logout</h2>
            <p>Are you sure you want to log out?</p>
            <div className="popup-buttons">
              <button className="confirm" onClick={handleLogout}>Yes</button>
              <button className="cancel" onClick={() => setShowLogoutConfirm(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
