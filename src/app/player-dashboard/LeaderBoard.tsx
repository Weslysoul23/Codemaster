"use client";

import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import "./LeaderBoard.css";

interface Player {
  username: string;
  points: number;
}

const LeaderBoard: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "leaderboard"), (snapshot) => {
      if (snapshot.empty) {
        setPlayers([]);
        setLoading(false);
        return;
      }

      const data = snapshot.docs.map((doc) => doc.data() as Player);
      // Sort by points (optional, remove if not needed)
      const sorted = data.sort((a, b) => b.points - a.points);
      setPlayers(sorted);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <p>Loading leaderboard...</p>;
  if (players.length === 0) return <p>No leaderboard data found.</p>;

  return (
    <div className="leaderboard-container">
      <h1>Leaderboard</h1>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <tr key={index}>
              <td>{player.username}</td>
              <td>{player.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderBoard;
