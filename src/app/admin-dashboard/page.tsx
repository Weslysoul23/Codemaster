"use client";

import React, { useState, useEffect } from "react";
import "./admin-dashboard.css";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { db } from "@/lib/firebaseConfig";
import { collection, getDocs, onSnapshot, deleteDoc, doc  } from "firebase/firestore";
import { getAuth } from "firebase/auth";


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

  const [stats, setStats] = useState({
    users: 0,
    feedbacks: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const usersSnap = await getDocs(collection(db, "users"));
        const feedbackSnap = await getDocs(collection(db, "feedbacks"));

        setStats({
          users: usersSnap.size,
          feedbacks: feedbackSnap.size,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchCounts();
  }, []);

  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "feedbacks"), (snapshot) => {
      setFeedbacks(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = async (id: string) => await deleteDoc(doc(db, "feedbacks", id));

  return (
    <div className="admin-dashboard">

      {/* ✅ TopBar (mobile only) */}
      <header className="topbar">
        <button className="menu-btn" onClick={() => setSidebarOpen(true)}>
          <Menu size={5} />
        </button>      
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
          <div className="p-6 text-white">
            <h1 className="text-2xl font-bold mb-4">Welcome, Admin!</h1>
            <p className="overview block">
                Overview of current players and feedback activity. <br />
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-gray-900 p-8 rounded-2xl shadow-lg text-center flex flex-col justify-center items-center min-h-[150px]">
                <h3 className="text-lg font-semibold text-gray-300">Players</h3>
                <p className="text-4xl font-bold text-blue-500">{stats.users}</p>
              </div>

              <div className="bg-gray-900 p-8 rounded-2xl shadow-lg text-center flex flex-col justify-center items-center min-h-[150px]">
                <h3 className="text-lg font-semibold text-gray-300">Feedbacks</h3>
                <p className="text-4xl font-bold text-blue-500">{stats.feedbacks}</p>
             </div>
            </div>
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
            <div className="min-h-screen p-6 bg-black text-white">
      <h1 className="text-3xl font-bold mb-6">📩 User Feedbacks</h1>
      {feedbacks.length === 0 ? (
        <p>No feedback yet...</p>
      ) : (
        feedbacks.map((fb) => (
          <div key={fb.id} className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700">
            <h2 className="text-lg font-bold">{fb.subject}</h2>
            <p className="text-sm text-gray-300">{fb.message}</p>
            <p className="text-xs text-gray-500 mt-1">
              From: {fb.name} — {fb.email}
            </p>
            <button
              className="mt-3 px-3 py-1 bg-red-600 rounded-md text-xs hover:bg-red-700"
              onClick={() => handleDelete(fb.id)}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
          </section>
        )}

        {activeTab === "purchases" && <h1>Player Purchases</h1>}
      </main>

      {/* ✅ Logout Modal */}
      {showLogoutConfirm && (
        <div className="logout-confirm-overlay">
          <div className="logout-confirm-box">
            <h2>Are you sure you want to log out?</h2>
            <div className="logout-buttons">
              <button className="confirm-yes" onClick={handleLogout}>
                Yes
              </button>
              <button
                className="confirm-no"
                onClick={() => setShowLogoutConfirm(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
