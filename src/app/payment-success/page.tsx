"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { app } from "@/lib/firebaseConfig";

export default function PaymentSuccess() {
  const [binaryRain, setBinaryRain] = useState<
    { id: number; left: number; duration: number; delay: number; bit: string }[]
  >([]);
  const [emailSent, setEmailSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [userInfo, setUserInfo] = useState<{ name?: string; email?: string }>({});

  // 🌧️ Generate binary rain
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

  // 🔑 Get user info from Firebase or session
  useEffect(() => {
    const auth = getAuth(app);
    const user = auth.currentUser;

    if (user) {
      setUserInfo({
        name: user.displayName || "CodeMaster User",
        email: user.email || "",
      });
    } else {
      const storedEmail = sessionStorage.getItem("userEmail");
      const storedName = sessionStorage.getItem("userName");
      if (storedEmail)
        setUserInfo({ name: storedName || "User", email: storedEmail });
    }
  }, []);

  // 💌 Send email receipt
  const sendEmailReceipt = async (auto = false) => {
    if (!userInfo.email) return;

    setSending(true);

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: userInfo.name,
          email: userInfo.email,
          amount: 299,
          description: "CodeMaster Pro Plan",
          date: new Date().toLocaleString(),
        }),
      });

      if (res.ok) {
        console.log("✅ Email sent successfully!");
        setEmailSent(true);
      } else {
        console.error("❌ Failed to send email");
      }
    } catch (err) {
      console.error("Email send error:", err);
    } finally {
      setSending(false);
    }
  };

  // 🔁 Auto send receipt on load (only once)
  useEffect(() => {
    if (userInfo.email && !emailSent && !sending) {
      sendEmailReceipt(true);
    }
  }, [userInfo, emailSent, sending]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-[#00ff99] font-mono overflow-hidden relative">
      {/* 🌌 Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,153,0.1)_0%,transparent_70%)] animate-pulse"></div>

      {/* 🧾 Payment Info */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="z-10 text-center"
      >
        <motion.h1
          className="text-4xl md:text-5xl font-bold tracking-widest mb-6"
          animate={{
            textShadow: [
              "0 0 5px #00ff99",
              "0 0 20px #00ff99",
              "0 0 10px #00ff99",
            ],
          }}
          transition={{ repeat: Infinity, repeatType: "mirror", duration: 2 }}
        >
          PAYMENT COMPLETE
        </motion.h1>

        <p className="text-lg md:text-xl opacity-80 mb-8">
          Your{" "}
          <span className="text-[#00ffaa] font-semibold">
            CodeMaster Pro Plan
          </span>{" "}
          has been activated.
        </p>

        {/* 💌 Email status */}
        <div className="mb-6">
          {sending ? (
            <motion.p
              className="text-sm opacity-80"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              📧 Sending your receipt...
            </motion.p>
          ) : emailSent ? (
            <p className="text-sm text-[#00ffaa]">✅ Receipt sent to {userInfo.email}</p>
          ) : (
            <p className="text-sm opacity-60">Sending your receipt...</p>
          )}
        </div>

        {/* 🔁 Resend Button */}
        {emailSent && (
          <button
            onClick={() => sendEmailReceipt(false)}
            disabled={sending}
            className={`border border-[#00ff99] px-6 py-3 rounded-xl transition-all duration-300 shadow-[0_0_10px_#00ff99] ${
              sending
                ? "bg-[#004422] text-gray-400 cursor-not-allowed"
                : "hover:bg-[#00ff99] hover:text-black"
            }`}
          >
            {sending ? "Resending..." : "Resend Receipt"}
          </button>
        )}

        {/* 🔗 Return */}
        <div className="mt-8">
          <Link
            href="/player-dashboard"
            className="border border-[#00ff99] px-6 py-3 rounded-xl hover:bg-[#00ff99] hover:text-black transition-all duration-300 shadow-[0_0_10px_#00ff99]"
          >
            Return to Dashboard
          </Link>
        </div>
      </motion.div>

      {/* 🌧️ Floating Binary Rain */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {binaryRain.map((drop) => (
          <motion.span
            key={drop.id}
            className="absolute text-[#00ff99] text-xs"
            initial={{ y: -100 }}
            animate={{ y: "100vh" }}
            transition={{
              repeat: Infinity,
              duration: drop.duration,
              delay: drop.delay,
              ease: "linear",
            }}
            style={{ left: `${drop.left}%` }}
          >
            {drop.bit}
          </motion.span>
        ))}
      </div>
    </div>
  );
}
