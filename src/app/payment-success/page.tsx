"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function PaymentSuccess() {
  const [binaryRain, setBinaryRain] = useState<
    { id: number; left: number; duration: number; delay: number; bit: string }[]
  >([]);

  useEffect(() => {
    // Generate binary rain effect
    const rain = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
      bit: Math.random() > 0.5 ? "1" : "0",
    }));
    setBinaryRain(rain);
  }, []);

useEffect(() => {
  const sendEmail = async () => {
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Wesly",
          email: "wesly@example.com",
          amount: "100.00",
          description: "CodeMaster Pro Plan",
          date: new Date().toLocaleDateString(),
        }),
      });

      if (!res.ok) throw new Error("Email send failed");
      console.log("✅ Payment confirmation email sent!");
    } catch (err) {
      console.error("❌ Failed to send email:", err);
    }
  };

  sendEmail();
}, []);


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-[#00ff99] font-mono overflow-hidden relative">
      {/* Background Matrix effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,153,0.1)_0%,transparent_70%)] animate-pulse"></div>

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

        <Link
          href="/player-dashboard"
          className="border border-[#00ff99] px-6 py-3 rounded-xl hover:bg-[#00ff99] hover:text-black transition-all duration-300 shadow-[0_0_10px_#00ff99]"
        >
          Return to Dashboard
        </Link>
      </motion.div>

      {/* Floating binary rain */}
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
            style={{
              left: `${drop.left}%`,
            }}
          >
            {drop.bit}
          </motion.span>
        ))}
      </div>
    </div>
  );
}
