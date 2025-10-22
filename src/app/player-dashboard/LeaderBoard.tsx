import React, { useEffect, useState } from "react";
import { db } from "@/lib/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

interface Leader {
  username: string;
  points: number;
  rank?: number;
}

const LeaderBoard: React.FC = () => {
  const [leaders, setLeaders] = useState<Leader[]>([]);

  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        const leaderboardRef = collection(db, "leaderboard");
        const snapshot = await getDocs(leaderboardRef);
        const data = snapshot.docs.map(doc => doc.data() as Leader);

        // Sort by points descending and assign rank
        const sorted = data.sort((a, b) => b.points - a.points)
                           .map((item, index) => ({ ...item, rank: index + 1 }));

        setLeaders(sorted);
      } catch (err) {
        console.error("Error fetching leaderboard:", err);
      }
    };

    fetchLeaders();
  }, []);

  if (leaders.length === 0) return <p>No leaderboard data found.</p>;

  return (
    <table className="leaderboard-table">
      <thead>
        <tr>
          <th>Username</th>
          <th>Rank</th>
          <th>Points</th>
        </tr>
      </thead>
      <tbody>
        {leaders.map((leader, index) => (
          <tr key={index}>
            <td>{leader.username}</td>
            <td>{leader.rank}</td>
            <td>{leader.points}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LeaderBoard;
