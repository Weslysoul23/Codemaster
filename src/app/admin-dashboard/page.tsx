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

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"dashboard" | "players" | "purchases" | "settings">("dashboard");
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

  const handleBanPlayer = (id: number) => {
    setPlayers(prev =>
      prev.map(p =>
        p.id === id ? { ...p, status: p.status === "banned" ? "active" : "banned" } : p
      )
    );
  };

  const handleDeletePlayer = (id: number) => {
    setPlayers(prev => prev.filter(p => p.id !== id));
  };

  const confirmLogout = () => {
    setShowLogoutConfirm(true);
  };

  const handleLogout = () => {
    setShowLogoutConfirm(false);
    router.push("/"); // Redirect to main page
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">Admin Panel</h2>
        <nav>
          <button className={activeTab === "dashboard" ? "active" : ""} onClick={() => setActiveTab("dashboard")}>Dashboard</button>
          <button className={activeTab === "players" ? "active" : ""} onClick={() => setActiveTab("players")}>Players</button>
          <button className={activeTab === "purchases" ? "active" : ""} onClick={() => setActiveTab("purchases")}>Purchases</button>
          <button className={activeTab === "settings" ? "active" : ""} onClick={() => setActiveTab("settings")}>Settings</button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {activeTab === "dashboard" && (
          <section className="dashboard-tab">
            <h1>Welcome, Admin</h1>
            <p>Monitor players, purchases, and system performance here.</p>
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
          <section className="players-tab">
            <h1>Manage Players</h1>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {players.map(player => (
                  <tr key={player.id}>
                    <td>{player.name}</td>
                    <td>{player.email}</td>
                    <td className={player.status}>{player.status}</td>
                    <td>
                      <button
                        className={player.status === "banned" ? "unban" : "ban"}
                        onClick={() => handleBanPlayer(player.id)}
                      >
                        {player.status === "banned" ? "Unban" : "Ban"}
                      </button>
                      <button className="delete" onClick={() => handleDeletePlayer(player.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {activeTab === "purchases" && (
          <section className="purchases-tab">
            <h1>Player Purchases</h1>
            <table>
              <thead>
                <tr>
                  <th>Player</th>
                  <th>Payment Method</th>
                  <th>Amount (₱)</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {purchases.map(p => (
                  <tr key={p.id}>
                    <td>{p.player}</td>
                    <td>{p.method}</td>
                    <td>{p.amount}</td>
                    <td>{p.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {activeTab === "settings" && (
          <section className="settings-tab">
            <h1>Settings</h1>
            <button className="logout-btn" onClick={confirmLogout}>Logout</button>
          </section>
        )}
      </main>

      {/* Logout Confirmation Popup */}
      {showLogoutConfirm && (
        <div className="popup-overlay">
          <div className="popup-glass">
            <h2>Confirm Logout</h2>
            <p>Are you sure you want to log out?</p>
            <div className="popup-buttons">
              <button className="confirm" onClick={handleLogout}>Yes</button>
              <button className="cancel" onClick={cancelLogout}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


export default AdminDashboard;
