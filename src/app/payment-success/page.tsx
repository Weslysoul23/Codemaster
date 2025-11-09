"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { getAuth, signInWithCustomToken, onAuthStateChanged } from "firebase/auth";
import { app } from "@/lib/firebaseConfig";
import { useSearchParams, useRouter } from "next/navigation";
import "./payment-success.css";

interface BinaryDrop {
  id: number;
  left: number;
  duration: number;
  delay: number;
  bit: string;
}

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [binaryRain, setBinaryRain] = useState<BinaryDrop[]>([]);
  const [userInfo, setUserInfo] = useState<{ name?: string; email?: string }>({});
  const [sending, setSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const emailAttempted = useRef(false);

  const auth = getAuth(app);

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

  // 🔑 Auto-login via custom token and redirect
  useEffect(() => {
// Reads ?token=CUSTOM_TOKEN_HERE
const token = searchParams.get("token");
if (token) {
  signInWithCustomToken(auth, token)
    .then((cred) => {
      const user = cred.user;
      sessionStorage.setItem("userEmail", user.email || "");
      sessionStorage.setItem("userName", user.displayName || "CodeMaster User");
      setTimeout(() => router.push("/player-dashboard"), 1500);
    });

    } else {
      // Fallback: check existing auth state
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setUserInfo({ name: user.displayName || "CodeMaster User", email: user.email || "" });
        } else {
          const storedEmail = sessionStorage.getItem("userEmail");
          const storedName = sessionStorage.getItem("userName");
          if (storedEmail) setUserInfo({ name: storedName || "User", email: storedEmail });
        }
      });
      return () => unsubscribe();
    }
  }, [searchParams, router, auth]);

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
      if (!res.ok) console.error("API Error:", data.error || res.statusText);
      if (data.success) setEmailSent(true);
    } catch (err) {
      console.error("Email send exception:", err);
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    if (userInfo.email && !emailSent && !sending) sendEmailReceipt(true);
  }, [userInfo, emailSent, sending]);

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
