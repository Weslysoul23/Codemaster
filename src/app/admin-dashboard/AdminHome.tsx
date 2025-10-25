"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export default function AdminHome() {
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

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">📊 Admin Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-gray-900 p-6 rounded-xl shadow-lg text-center">
          <h3 className="text-lg font-semibold text-gray-300">Players</h3>
          <p className="text-4xl font-bold text-blue-500">{stats.users}</p>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl shadow-lg text-center">
          <h3 className="text-lg font-semibold text-gray-300">Feedbacks</h3>
          <p className="text-4xl font-bold text-blue-500">{stats.feedbacks}</p>
        </div>
      </div>
    </div>
  );
}
