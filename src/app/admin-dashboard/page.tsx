"use client";

import React, { useState, useEffect } from "react";
import "./admin-dashboard.css";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import AdminFeedback from "./AdminFeedback";
import AdminHome from "./AdminHome";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "players" | "feedbacks" | "purchases"
  >("dashboard");

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    setShowLogoutConfirm(false);
    router.push("/");
  };

  // ✅ Disable scroll when sidebar is open (mobile)
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [sidebarOpen]);

  return (
    <div className="admin-dashboard">

      {/* ✅ TopBar (mobile only) */}
      <header className="topbar">
        <button className="menu-btn" onClick={() => setSidebarOpen(true)}>
          <Menu size={22} />
        </button>
        <h2>Admin Panel</h2>
      </header>

      {/* ✅ Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setSidebarOpen(false)}>
          <X size={22} />
        </button>

        <h2 className="logo">Admin Panel</h2>

        <nav>
          <button className={activeTab === "dashboard" ? "active" : ""}
            onClick={() => { setActiveTab("dashboard"); setSidebarOpen(false); }}>
            Home
          </button>

          <button className={activeTab === "players" ? "active" : ""}
            onClick={() => { setActiveTab("players"); setSidebarOpen(false); }}>
            Manage Players
          </button>

          <button className={activeTab === "feedbacks" ? "active" : ""}
            onClick={() => { setActiveTab("feedbacks"); setSidebarOpen(false); }}>
            Feedbacks
          </button>

          <button className={activeTab === "purchases" ? "active" : ""}
            onClick={() => { setActiveTab("purchases"); setSidebarOpen(false); }}>
            Purchases
          </button>

          <button className="logout-btn"
            onClick={() => setShowLogoutConfirm(true)}>
            Logout
          </button>
        </nav>
      </aside>

      {/* ✅ Overlay */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* ✅ Main Content */}
      <main className="main-content">
        {activeTab === "dashboard" && (
          <section>
            <div className="content-wrapper">
              <AdminHome />
            </div>
          </section>
        )}

        {activeTab === "players" && (
  <section className="manage-players">
    <h1>Manage Players</h1>

    <table className="players-table">
      <thead>
        <tr>
          <th>User ID</th>
          <th>Email</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {/* Placeholder Data — This will later come from Firebase */}
        <tr>
          <td>UID123</td>
          <td>player1@email.com</td>
          <td className="status active">Active</td>
          <td className="actions">
            <button className="disable-btn">Disable</button>
            <button className="ban-btn">Ban</button>
            <button className="delete-btn">Delete</button>
          </td>
        </tr>

        <tr>
          <td>UID789</td>
          <td>hacker@email.com</td>
          <td className="status banned">Banned</td>
          <td className="actions">
            <button className="disable-btn">Enable</button>
            <button className="ban-btn">Unban</button>
            <button className="delete-btn">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
)}


        {activeTab === "feedbacks" && (
          <section>
            <h1>User Feedbacks</h1>
            <div className="content-wrapper">
              <AdminFeedback />
            </div>
          </section>
        )}

        {activeTab === "purchases" && <h1>Player Purchases</h1>}
      </main>

      {/* ✅ Logout Modal */}
      {showLogoutConfirm && (
        <div className="popup-overlay">
          <div className="popup-glass">
            <h2>Confirm Logout</h2>
            <p>Are you sure?</p>
            <div className="popup-buttons">
              <button className="confirm" onClick={handleLogout}>Yes</button>
              <button className="cancel" onClick={() => setShowLogoutConfirm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
