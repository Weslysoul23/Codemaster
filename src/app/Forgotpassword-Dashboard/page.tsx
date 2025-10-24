"use client";
import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";
import "./ForgotPassword.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
        await sendPasswordResetEmail(auth, email, {
        url: "https://codemaster.vercel.app/ResetPassword-Dashboard", 
        handleCodeInApp: true,
      });
      setMessage("Reset link sent! Please check your email.");
    } catch (error: any) {
      setMessage("Error sending reset email. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-container">
      <div className="forgot-card">
        <h2>FORGOT YOUR PASSWORD</h2>
        <p>
          Please enter the email address you’d like your password reset
          information sent to.
        </p>
        <form onSubmit={handleReset}>
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Request Reset Link"}
          </button>
        </form>
        {message && <p className="message">{message}</p>}
        <a href="/Login" className="back-link">
          Back to Login
        </a>
      </div>
    </div>
  );
}
