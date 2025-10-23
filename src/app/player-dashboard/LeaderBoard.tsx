"use client";

import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue, off } from "firebase/database";
import { app } from "@/lib/firebaseConfig";
import "./LeaderBoard.css";

interface Player {
  username: string;
  points: number;
}

const LeaderBoard: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const db = getDatabase(app);
    const leaderboardRef = ref(db, "leaderboard");

    // Listen for realtime updates
    const listener = onValue(leaderboardRef, (snapshot) => {
      if (!snapshot.exists()) {
        console.log("⚠️ No leaderboard data found.");
        setPlayers([]);
        setLoading(false);
        return;
      }

      const data = snapshot.val();
      console.log("🔥 Raw data:", data);

      // Convert object into array
      const playerArray: Player[] = Object.keys(data).map((key) => ({
        username: data[key].username || "Unknown Player",
        points: data[key].points || 0,
      }));

      // Sort by points descending
      const sorted = playerArray.sort((a, b) => b.points - a.points);
      setPlayers(sorted);
      setLoading(false);
    });

    // Proper cleanup
    return () => off(leaderboardRef, "value", listener);
  }, []);

  if (loading) return <p>Loading leaderboard...</p>;
  if (players.length === 0) return <p>No leaderboard data found.</p>;

  return (
    <div className="leaderboard-container">
      <h1>Leaderboard</h1>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Uusername</th>
            <th>Rank</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <tr key={index}>
              <td>{player.username}</td>
              <td>{index + 1}</td>
              <td>{player.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderBoard;
