"use client";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebaseConfig";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default function AdminFeedbacks() {
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
  );
}
