"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { app } from "@/lib/firebaseConfig";
import "./payment-success.css";

interface BinaryDrop {
  id: number;
  left: number;
  duration: number;
  delay: number;
  bit: string;
}

export default function PaymentSuccess() {
  const [binaryRain, setBinaryRain] = useState<BinaryDrop[]>([]);
  const [userInfo, setUserInfo] = useState<{ uid?: string; name?: string; email?: string }>({});
  const [sending, setSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [firebaseSaved, setFirebaseSaved] = useState(false);
  const emailAttempted = useRef(false);
  const firebaseAttempted = useRef(false);

  // 🌧️ Binary Rain Effect
  useEffect(() => {
    const rain = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
      bit: Math.random() > 0.5 ? "1" : "0",
    }));
    setBinaryRain(rain);
  }, []);

  // 🔑 Load User Info
  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserInfo({
          uid: user.uid,
          name: user.displayName || "CodeMaster User",
          email: user.email || "",
        });
      } else {
        const storedEmail = sessionStorage.getItem("userEmail");
        const storedName = sessionStorage.getItem("userName");
        if (storedEmail) {
          setUserInfo({
            name: storedName || "User",
            email: storedEmail,
          });
        }
      }
    });
    return () => unsubscribe();
  }, []);

  // 💌 Send Email Receipt
  const sendEmailReceipt = async (auto = false) => {
    if (!userInfo?.email) return;
    if (auto && emailAttempted.current) return;
    emailAttempted.current = true;
    setSending(true);

    const payload = {
      name: userInfo.name || "Valued Customer",
      email: userInfo.email,
      amount: 299,
      description: "CodeMaster Pro Plan",
      date: new Date().toLocaleString(),
    };

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) setEmailSent(true);
    } catch (err) {
      console.error("Email send exception:", err);
    } finally {
      setSending(false);
    }
  };

  // 💾 Save to Firebase RTDB (under UID)
  const saveToFirebase = async () => {
    if (!userInfo?.uid || firebaseAttempted.current) return;
    firebaseAttempted.current = true;

    try {
      const db = getDatabase(app);
      const userRef = ref(db, `subscriptions/${userInfo.uid}`);

      const subscriptionData = {
        account: userInfo.email || "unknown",
        name: userInfo.name || "CodeMaster User",
        hasPurchasedPro: true,
        amount: 299,
        plan: "CodeMaster Pro Plan",
        date: new Date().toLocaleString(),
        transactionId: "frontend_txn_" + Date.now(),
      };

      await set(userRef, subscriptionData);

      console.log("✅ Subscription saved to Firebase under UID:", userInfo.uid);
      setFirebaseSaved(true);
    } catch (err) {
      console.error("Firebase save exception:", err);
    }
  };

  // 🧠 Auto-trigger when user info loads
  useEffect(() => {
    if (userInfo.email && userInfo.uid) {
      sendEmailReceipt(true);
      saveToFirebase();
    }
  }, [userInfo]);

  return (
    <div className="payment-success-container min-h-screen flex flex-col items-center justify-center font-mono overflow-hidden relative text-[#00ff99] bg-black">
      <div className="background-glow absolute inset-0"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="z-10 text-center"
      >
        <motion.h1
          className="payment-title text-4xl md:text-5xl font-bold tracking-widest mb-6"
          animate={{ textShadow: ["0 0 5px #00ff99", "0 0 20px #00ff99", "0 0 10px #00ff99"] }}
          transition={{ repeat: Infinity, repeatType: "mirror", duration: 2 }}
        >
          PAYMENT COMPLETE
        </motion.h1>

        <p className="text-lg md:text-xl opacity-80 mb-8">
          Your <span className="text-[#00ffaa] font-semibold">CodeMaster Pro Plan</span> has been activated.
        </p>

        <div className="mb-6">
          {sending ? (
            <motion.p className="text-sm opacity-80" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.5, repeat: Infinity }}>
              📧 Sending your receipt...
            </motion.p>
          ) : emailSent ? (
            <p className="text-sm text-[#00ffaa]">✅ Receipt sent to {userInfo.email}</p>
          ) : (
            <p className="text-sm opacity-60">Preparing your digital receipt...</p>
          )}
          {firebaseSaved ? (
            <p className="text-sm text-[#00ffaa]">💾 Subscription saved in Firebase</p>
          ) : (
            <p className="text-sm opacity-60">Saving subscription to Firebase...</p>
          )}
        </div>

        {emailSent && (
          <button
            onClick={() => sendEmailReceipt(false)}
            disabled={sending}
            className="resend-btn border px-6 py-3 rounded-xl transition-all duration-300 shadow-glow hover:bg-[#00ff99] hover:text-black disabled:bg-[#004422] disabled:text-gray-400"
          >
            {sending ? "Resending..." : "Resend Receipt"}
          </button>
        )}

        <div className="mt-8">
          <Link href="/player-dashboard" className="return-btn border px-6 py-3 rounded-xl hover:bg-[#00ff99] hover:text-black transition-all duration-300 shadow-glow">
            Return to Dashboard
          </Link>
        </div>
      </motion.div>

      <div className="binary-rain absolute inset-0 overflow-hidden opacity-20">
        {binaryRain.map((drop) => (
          <motion.span
            key={drop.id}
            className="absolute text-[#00ff99] text-xs"
            initial={{ y: -100 }}
            animate={{ y: "100vh" }}
            transition={{ repeat: Infinity, duration: drop.duration, delay: drop.delay, ease: "linear" }}
            style={{ left: `${drop.left}%` }}
          >
            {drop.bit}
          </motion.span>
        ))}
      </div>
    </div>
  );
}
