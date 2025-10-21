"use client";

import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";
import { useRouter } from "next/navigation";
import "./ForgotPassword.css";

const ForgotPasswordPage = () => {
  
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const router = useRouter();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setIsSending(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage(
        "A password reset link has been sent to your email address. Please check your inbox."
      );
      setEmail("");
    } catch (err: any) {
      console.error("Error sending password reset email:", err);
      if (err.code === "auth/user-not-found") {
        setError("No account found with this email address.");
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email format. Please enter a valid email address.");
      } else {
        setError("Failed to send reset link. Please try again later.");
      }
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="forgot-container">
      <div className="forgot-box">
        <h1 className="forgot-title">FORGOT YOUR PASSWORD</h1>
        <p className="forgot-subtext">
          Please enter the email address you’d like your password reset
          information sent to.
        </p>

        <form onSubmit={handleResetPassword} className="forgot-form">
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="forgot-input"
          />

          {error && <p className="forgot-error">{error}</p>}
          {message && <p className="forgot-message">{message}</p>}

          <button
            type="submit"
            disabled={isSending}
            className="forgot-button"
          >
            {isSending ? "Sending..." : "Request Reset Link"}
          </button>
        </form>

        <div className="forgot-footer">
          <button
            onClick={() => router.push("/")}
            className="forgot-back"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
