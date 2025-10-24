"use client";

import React, { useState, useEffect } from "react";
import "./player-dashboard.css";
import LeaderBoard from "./LeaderBoard";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";
import { app } from "@/lib/firebaseConfig";

const PlayerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "home" | "leaderboard" | "shop" | "subscription"
  >("home");
  const [loggedIn, setLoggedIn] = useState(true);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [username, setUsername] = useState<string>("Player");
  const [rank, setRank] = useState<number | string>("N/A");
  const [points, setPoints] = useState<number | string>("N/A");

  useEffect(() => {
    const auth = getAuth(app);
    const db = getDatabase(app);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userRef = ref(db, `users/${user.uid}/username`);
        onValue(userRef, (snapshot) => {
          if (snapshot.exists()) {
            setUsername(snapshot.val());
          }
        });

        // Fetch leaderboard data (for rank + points)
        const leaderboardRef = ref(db, "leaderboard");
        onValue(leaderboardRef, (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();

            // Convert object → array
            const leaderboardArray = Object.keys(data).map((key) => ({
              uid: key,
              username: data[key].username,
              points: data[key].points || 0,
            }));

            // Sort by points descending
            leaderboardArray.sort((a, b) => b.points - a.points);

            // Find user’s position
            const userIndex = leaderboardArray.findIndex(
              (item) => item.uid === user.uid
            );

            if (userIndex !== -1) {
              setRank(userIndex + 1); // rank position
              setPoints(leaderboardArray[userIndex].points); // user points
            } else {
              setRank("Unranked");
              setPoints("N/A");
            }
          }
        });
      } else {
        setLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    setLoggedIn(false);
    window.location.href = "/";
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
    <div className="player-dashboard">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <nav className="sidebar-nav">
          <button
            className={activeTab === "home" ? "active" : ""}
            onClick={() => setActiveTab("home")}
          >
            Home
          </button>
          <button
            className={activeTab === "leaderboard" ? "active" : ""}
            onClick={() => setActiveTab("leaderboard")}
          >
            Leader Board
          </button>
          <button
            className={activeTab === "shop" ? "active" : ""}
            onClick={() => setActiveTab("shop")}
          >
            In-Game Shop
          </button>
          <button
            className={activeTab === "subscription" ? "active" : ""}
            onClick={() => setActiveTab("subscription")}
          >
            Subscription
          </button>
          <button onClick={() => setShowLogoutConfirm(true)}>Logout</button>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="dashboard-main">
        {activeTab === "home" && (
          <section className="tab-content home-content">
            <h1>Welcome Back, {username}!</h1>
            <p className="home-tagline">
              The world’s last defense isn’t a gun — it’s a line of code.
            </p>
            <div className="home-boxes">
              <div className="info-box">
                <h2>Rank</h2>
                <p>{rank}</p>
              </div>
              <div className="info-box">
                <h2>Points</h2>
                <p>{points}</p>
              </div>
            </div>
          </section>
        )}

        {activeTab === "leaderboard" && (
          <section className="tab-content">
            <LeaderBoard />
          </section>
        )}

        {activeTab === "shop" && (
          <section className="tab-content shop-content">
            <h1>In-Game Shop</h1>
            <p className="shop-tagline">
              Coming soon — power-ups, skins, and more!
            </p>
          </section>
        )}

        {activeTab === "subscription" && (
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
                  <li>
                    <span className="highlight">Limited</span> Access to levels
                  </li>
                </ul>
              </div>

              {/* Pro Plan */}
              <div className="plan-box">
                <h2 className="plan-title pro">Pro</h2>
                <p className="plan-subtitle">Best for learning C#</p>
                <p className="plan-price">
                  $15<span>/month</span>
                </p>
                <button className="subscribe-btn">Subscribe Now</button>
                <button className="paypal-btn">Pay with PayPal</button>
                <h3 className="plan-section-title">Everything in Free, plus:</h3>
                <ul className="plan-features">
                  <li>
                    <span className="highlight">Full</span> Access to all levels
                  </li>
                  <li>
                    <span className="highlight">Access</span> to Creative mode
                  </li>
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
};

export default PlayerDashboard;
