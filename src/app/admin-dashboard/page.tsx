"use client";

import React, { useState, useEffect } from "react";
import "./admin-dashboard.css";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { db, app } from "@/lib/firebaseConfig";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import {
  collection,
  getDocs,
  onSnapshot,
  deleteDoc,
  doc as firestoreDoc,
} from "firebase/firestore";
import {
  getDatabase,
  ref,
  onValue,
  off,
  update,
  remove,
  get,
} from "firebase/database";

// ✅ Add this type definition here
interface Player {
  id: string;
  username: string;
  email: string;
  status: "active" | "disabled" | string;
}

export default function AdminDashboard() {

  const [loggedIn, setLoggedIn] = useState(true); // ✅ added
  const [activeTab, setActiveTab] = useState<"dashboard" | "players" | "feedbacks" | "purchases">("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    const auth = getAuth(app);
    await signOut(auth);
    setLoggedIn(false);
    window.location.href = "/";
  };


  // Prevent body scroll when sidebar open (mobile)
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [sidebarOpen]);

  
  // Stats for dashboard counts
  const [stats, setStats] = useState({
    users: 0,
    feedbacks: 0,
  });

  // Fetch dashboard counts
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // --- Firestore feedbacks ---
        const feedbackSnap = await getDocs(collection(db, "feedbacks"));
        const feedbackCount = feedbackSnap.size;

        // --- Realtime Database players ---
        const dbRT = getDatabase(app);
        const playersRef = ref(dbRT, "users");
        const snapshot = await get(playersRef);

        let playerCount = 0;
        if (snapshot.exists()) {
          const data = snapshot.val();
          playerCount = Object.keys(data).length;
        }

        // ✅ Update state
        setStats({
          users: playerCount,
          feedbacks: feedbackCount,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchCounts();
  }, []);

  // Real-time feedback updates
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "feedbacks"), (snapshot) => {
      setFeedbacks(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return () => unsubscribe();
  }, []);

  // Delete feedback
  const handleDeleteFeedback = async (id: string) => {
    try {
      await deleteDoc(firestoreDoc(db, "feedbacks", id));
    } catch (err) {
      console.error("Failed to delete feedback:", err);
    }
  };

  // --- Real-time Reports (Realtime Database) ---
const [reports, setReports] = useState<any[]>([]);
useEffect(() => {
  const dbRT = getDatabase(app);
  const reportsRef = ref(dbRT, "match_reports");

  const unsubscribe = onValue(reportsRef, (snapshot) => {
    if (!snapshot.exists()) {
      setReports([]);
      return;
    }
    const data = snapshot.val();
    const reportArray = Object.keys(data).map((key) => ({
      id: key,
      ...data[key],
    }));
    setReports(reportArray);
  });

  return () => off(reportsRef, "value", unsubscribe);
}, []);

const handleDeleteReport = async (id: string) => {
  try {
    const dbRT = getDatabase(app);
    const reportRef = ref(dbRT, `match_reports/${id}`);
    await remove(reportRef);
    console.log(`🗑️ Report ${id} deleted successfully.`);
  } catch (error) {
    console.error("❌ Failed to delete report:", error);
  }
};



  // --- Realtime Players (Realtime Database) ---
  const [players, setPlayers] = useState<Player[]>([]);
  const [loadingPlayers, setLoadingPlayers] = useState(true);

  useEffect(() => {
  const dbRT = getDatabase(app);
  const playersRef = ref(dbRT, "users"); // or "players" depending on your data path

  const listener = onValue(playersRef, (snapshot) => {
    console.log("📡 Snapshot received:", snapshot.val());

    if (!snapshot.exists()) {
      console.warn("⚠️ No player data found or path incorrect!");
      setPlayers([]);
      setLoadingPlayers(false);
      return;
    }

    const data = snapshot.val();
    const playerArray: Player[] = Object.keys(data).map((key) => ({
      id: key,
      username: data[key].username || "Unknown",
      email: data[key].email || "N/A",
      status: data[key].status || "active",
    }));

    setPlayers(playerArray);
    setLoadingPlayers(false);
  });

  return () => off(playersRef, "value", listener);
}, []);


  // --- Player Actions ---
const handleDisable = async (id: string, currentStatus?: string) => {
  try {
    const dbRT = getDatabase(app);
    const playerRef = ref(dbRT, `users/${id}`);
    const newStatus = currentStatus === "disabled" ? "active" : "disabled";

    // Ask reason only if disabling
    let reason = "";
    if (newStatus === "disabled") {
      reason = prompt("Enter reason for disabling this player:");
      if (!reason) {
        alert("Action cancelled. You must provide a reason.");
        return;
      }
    }

    const now = new Date();
    const disableUntil = new Date(now.getTime() + 5 * 60 * 1000); // 5 minutes later

    const updateData =
      newStatus === "disabled"
        ? {
            status: "disabled",
            disableReason: reason,
            disabledAt: now.toISOString(),
            disableUntil: disableUntil.toISOString(),
          }
        : {
            status: "active",
            disableReason: null,
            disabledAt: null,
            disableUntil: null,
          };

    await update(playerRef, updateData);

    console.log(
      `✅ Player ${id} ${newStatus === "disabled" ? "disabled" : "enabled"}`
    );

    if (newStatus === "disabled") {
      console.log(`🕒 Disabled for 5 minutes | Reason: ${reason}`);
    }
  } catch (error) {
    console.error("❌ Error disabling player:", error);
  }
};

  

  if (!loggedIn) {
    return (
      <div className="logout-message">
        <h1>You have been logged out.</h1>
        <a href="/" className="logout-link">
          Return to Login
        </a>
      </div>
    );
  }


  

  return (
    <div className="admin-dashboard">
      {/* Topbar (mobile) */}
      <header className="topbar">
        <button className="menu-btn" onClick={() => setSidebarOpen(true)}>
          <Menu size={22} />
        </button>
      </header>

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setSidebarOpen(false)}>
          <X size={22} />
        </button>

        <h2 className="logo">Admin Panel</h2>

        <nav>
          <button
            className={activeTab === "dashboard" ? "active" : ""}
            onClick={() => {
              setActiveTab("dashboard");
              setSidebarOpen(false);
            }}
          >
            Home
          </button>

          <button
            className={activeTab === "players" ? "active" : ""}
            onClick={() => {
              setActiveTab("players");
              setSidebarOpen(false);
            }}
          >
            Manage Players
          </button>

          <button
            className={activeTab === "feedbacks" ? "active" : ""}
            onClick={() => {
              setActiveTab("feedbacks");
              setSidebarOpen(false);
            }}
          >
            Feedbacks & Reports
          </button>

          <button
            className={activeTab === "purchases" ? "active" : ""}
            onClick={() => {
              setActiveTab("purchases");
              setSidebarOpen(false);
            }}
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

        <div className="sidebar-logo">
          <span className="glitch" data-text="CODEMASTER">
            <strong>CODEMASTER</strong>
          </span>
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main content */}
      <main className="main-content">
        {/* Dashboard tab */}
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
                  <p className="text-4xl font-bold text-blue-500">
                    {stats.users}
                  </p>
                </div>

                <div className="bg-gray-900 p-8 rounded-2xl shadow-lg text-center flex flex-col justify-center items-center min-h-[150px]">
                  <h3 className="text-lg font-semibold text-gray-300">
                    Feedbacks
                  </h3>
                  <p className="text-4xl font-bold text-blue-500">
                    {stats.feedbacks}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Players tab */}
        {activeTab === "players" && (
          <section className="manage-players">
            <h2 className="logo">Manage Players</h2>
            {loadingPlayers ? (
              <p>Loading players...</p>
            ) : players.length === 0 ? (
              <p>No players found.</p>
            ) : (
              <table className="players-table">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {players.map((player) => (
                    <tr key={player.id}>
                      <td>{player.username}</td>
                      <td>{player.email}</td>
                      <td
                        className={`status ${
                          player.status === "banned"
                            ? "banned"
                            : player.status === "disabled"
                            ? "disabled"
                            : "active"
                        }`}
                      >
                        {player.status}
                        {player.status === "disabled" && player.disableReason && (
                          <div className="text-xs text-gray-400 mt-1">
                            Reason: {player.disableReason}
                          </div>
                        )}
                      </td>
                      <td className="actions">
                        <button
                          className="disable-btn"
                          onClick={() => handleDisable(player.id, player.status)}
                        >
                          {player.status === "disabled" ? "Enable" : "Disable"}
                        </button>
                      </td>
                    </tr>
                  ))}

                </tbody>
              </table>
            )}
          </section>
        )}

        {/* Feedbacks tab */}
        {activeTab === "feedbacks" && (
  <section className="min-h-screen p-6 bg-black text-white">
    <h1 className="text-3xl font-bold mb-6">📩 Feedbacks & Reports</h1>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* --- Feedbacks --- */}
      <div>
        <h2 className="text-xl font-bold mb-4 text-blue-400">User Feedbacks</h2>
        {feedbacks.length === 0 ? (
          <p>No feedback yet...</p>
        ) : (
          feedbacks.map((fb) => (
            <div
              key={fb.id}
              className="bg-gray-800 p-4 mb-4 rounded-lg shadow-md border border-gray-700"
            >
              <h3 className="text-lg font-semibold">{fb.subject}</h3>
              <p className="text-sm text-gray-300">{fb.message}</p>
              <p className="text-xs text-gray-500 mt-1">
                From: {fb.name} — {fb.email}
              </p>
              <button
                className="mt-3 px-3 py-1 bg-red-600 rounded-md text-xs hover:bg-red-700"
                onClick={() => handleDeleteFeedback(fb.id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>

      {/* --- Reports (Realtime Database) --- */}
      <div>
        <h2 className="text-xl font-bold mb-4 text-yellow-400">Player Reports</h2>
        {reports.length === 0 ? (
          <p>No reports yet...</p>
        ) : (
          reports.map((rp) => (
            <div
              key={rp.id}
              className="bg-gray-800 p-4 mb-4 rounded-lg shadow-md border border-gray-700"
            >
              <p className="text-sm text-gray-300 mb-1">
                <strong>Winner:</strong> {rp.winner || "N/A"}
              </p>
              <p className="text-sm text-gray-300 mb-1">
                <strong>Loser:</strong> {rp.loser || "N/A"}
              </p>
              <p className="text-sm text-gray-300 mb-1">
                <strong>Message:</strong> {rp.message || ""}
              </p>
              <p className="text-xs text-gray-500">
                {rp.timestamp ? new Date(rp.timestamp).toLocaleString() : ""}
              </p>
              <button
                className="mt-3 px-3 py-1 bg-red-600 rounded-md text-xs hover:bg-red-700"
                onClick={() => handleDeleteReport(rp.id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  </section>
)}

        {/* Purchases tab */}
        {activeTab === "purchases" && <h1>Player Purchases</h1>}
      </main>

      {/* Logout confirmation modal */}
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
