"use client";

import React, { useState } from "react";
import "./admin-dashboard.css";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react"; // ✅ Hamburger & Close Icons
import AdminFeedback from "@/components/AdminFeedback";

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
        {/* Close button mobile */}
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

      {/* ✅ Main Content */}
      <main className="main-content">
        {activeTab === "dashboard" && (
          <section>
            <h1>Dashboard Overview</h1>
          </section>
        )}

        {activeTab === "players" && (
          <section>
            <h1>Manage Players</h1>
          </section>
        )}

        {activeTab === "feedbacks" && (
          <section>
            <h1>User Feedbacks</h1>
            <div className="w-full md:w-1/2 lg:w-[65%] flex justify-center">
              <AdminFeedback />
            </div>
          </section>
        )}

        {activeTab === "purchases" && (
          <section>
            <h1>Player Purchases</h1>
          </section>
        )}
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
