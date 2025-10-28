"use client";

import React, { useState, useEffect } from "react";
import "./player-dashboard.css";
import LeaderBoard from "./LeaderBoard";
import { getAuth, onAuthStateChanged, signOut, signInWithCustomToken } from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";
import { app } from "@/lib/firebaseConfig";
import { Menu } from "lucide-react";

interface LevelProgress {
  [stageKey: string]: boolean;
}

const PlayerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"home" | "leaderboard" | "shop" | "subscription">("home");
  const [loggedIn, setLoggedIn] = useState(true);
  const [loading, setLoading] = useState(true);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [username, setUsername] = useState<string>("Player");
  const [rank, setRank] = useState<number | string>("N/A");
  const [points, setPoints] = useState<number | string>("N/A");
  const [progressData, setProgressData] = useState<LevelProgress>({});
  const [expandedLevel, setExpandedLevel] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const auth = getAuth(app);
  const db = getDatabase(app);

  // === 🔥 AUTO LOGIN FROM UNITY TOKEN ===
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const verifiedToken = params.get("verified");

    if (verifiedToken) {
      console.log("Received verified token from Unity — signing in...");
      signInWithCustomToken(auth, verifiedToken)
        .then(() => {
          console.log("✅ Auto-login successful!");
          setLoading(false);
          window.history.replaceState({}, "", "/player-dashboard"); // clean URL
        })
        .catch((err) => {
          console.error("❌ Auto-login failed:", err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  // === AUTH & DATABASE LISTENERS ===
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // --- Username ---
        const userRef = ref(db, `users/${user.uid}/username`);
        onValue(userRef, (snapshot) => {
          if (snapshot.exists()) setUsername(snapshot.val());
        });

        // --- 🔥 Ban / Disable Check ---
        const statusRef = ref(db, `users/${user.uid}/status`);
        onValue(statusRef, (snapshot) => {
          const status = snapshot.val();
          if (status === "banned" || status === "disabled") {
            alert(`Your account has been ${status}. Logging out...`);
            signOut(auth).then(() => {
              setLoggedIn(false);
              window.location.href = "/";
            });
          }
        });

        // --- Leaderboard ---
        const leaderboardRef = ref(db, "leaderboard");
        onValue(leaderboardRef, (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            const leaderboardArray = Object.keys(data).map((key) => ({
              uid: key,
              username: data[key].username,
              points: data[key].points || 0,
            }));

            leaderboardArray.sort((a, b) => b.points - a.points);
            const userIndex = leaderboardArray.findIndex((item) => item.uid === user.uid);

            if (userIndex !== -1) {
              setRank(userIndex + 1);
              setPoints(leaderboardArray[userIndex].points);
            } else {
              setRank("Unranked");
              setPoints("N/A");
            }
          }
        });

        // --- Player Progress ---
        const progressRef = ref(db, `users/${user.uid}/progress`);
        onValue(progressRef, (snapshot) => {
          if (snapshot.exists()) {
            setProgressData(snapshot.val());
          } else {
            setProgressData({});
          }
        });
      } else {
        setLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setLoggedIn(false);
    window.location.href = "/";
  };

  const toggleLevel = (level: string) => {
    setExpandedLevel(expandedLevel === level ? null : level);
  };

  const levels = {
    Level1: ["LVL 1 - Stage 1", "LVL 1 - Stage 2", "LVL 1 - Stage 3", "LVL 1 - Stage 4"],
    Level2: ["LVL 2 - Stage 1", "LVL 2 - Stage 2", "LVL 2 - Stage 3", "LVL 2 - Stage 4"],
    Level3: ["LVL 3 - Stage 1", "LVL 3 - Stage 2", "LVL 3 - Stage 3", "LVL 3 - Stage 4"],
    Level4: ["LVL 4 - Stage 1", "LVL 4 - Stage 2", "LVL 4 - Stage 3", "LVL 4 - Stage 4"],
    Level5: ["LVL 5 - Stage 1", "LVL 5 - Stage 2", "LVL 5 - Stage 3", "LVL 5 - Stage 4"],
    Level6: ["LVL 6 - Final Boss"],
  };

  // === LOADING STATE ===
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl animate-pulse">🔐 Verifying your session...</p>
      </div>
    );
  }

  // === LOGGED OUT STATE ===
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

  // === MAIN DASHBOARD ===
  return (
    <div className="player-dashboard">
      <header className="topbar">
        <button className="menu-btn" onClick={() => setSidebarOpen(true)}>
          <Menu size={22} />
        </button>
      </header>

      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <h2 className="logo">Players Panel</h2>
        <nav className="sidebar-nav">
          <button className={activeTab === "home" ? "active" : ""} onClick={() => setActiveTab("home")}>Home</button>
          <button className={activeTab === "leaderboard" ? "active" : ""} onClick={() => setActiveTab("leaderboard")}>Leader Board</button>
          <button className={activeTab === "shop" ? "active" : ""} onClick={() => setActiveTab("shop")}>In-Game Shop</button>
          <button className={activeTab === "subscription" ? "active" : ""} onClick={() => setActiveTab("subscription")}>Subscription</button>
          <button onClick={() => setShowLogoutConfirm(true)}>Logout</button>
        </nav>
      </aside>

      <main className="dashboard-main">
        {activeTab === "home" && (
          <section className="tab-content home-content">
            <h1>Welcome Back, {username}!</h1>
            <p className="home-tagline">
              <em>The world’s last defense isn’t a gun — it’s a line of code.</em>
            </p>

            <div className="home-boxes">
              <div className="info-box"><h2>Rank</h2><p>{rank}</p></div>
              <div className="info-box"><h2>Points</h2><p>{points}</p></div>

              <div className="info-box large">
                <h2>Stage Progression</h2>
                <div className="levels-container">
                  {Object.entries(levels).map(([levelKey, stages]) => (
                    <div key={levelKey} className="level-block">
                      <button className="level-toggle-btn" onClick={() => toggleLevel(levelKey)}>
                        {levelKey.replace("Level", "Level ")} <span>{expandedLevel === levelKey ? "▲" : "▼"}</span>
                      </button>

                      {expandedLevel === levelKey && (
                        <div className="stage-list">
                          {stages.map((stageName) => {
                            const isCompleted = progressData?.[stageName] === true;
                            return (
                              <div key={stageName} className={`stage-item ${isCompleted ? "completed" : "incomplete"}`}>
                                {stageName} {isCompleted ? "✅" : "❌"}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === "leaderboard" && (
          <section className="tab-content"><LeaderBoard /></section>
        )}

        {activeTab === "shop" && (
          <section className="tab-content shop-content">
            <h1>In-Game Shop</h1>
            <p className="shop-tagline">Coming soon — power-ups, skins, and more!</p>
          </section>
        )}

        {activeTab === "subscription" && (
          <section className="tab-content subscription-content">
            <h1>Upgrade Your Plan</h1>
            <p className="subscription-tagline">Choose the plan that fits your coding journey.</p>

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
                  <li><span className="highlight">Full</span> Access to all levels</li>
                  <li><span className="highlight">Access</span> to Creative mode</li>
                </ul>
              </div>
            </div>
          </section>
        )}
      </main>

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
