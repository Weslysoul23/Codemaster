"use client";
import React, { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { confirmPasswordReset, verifyPasswordResetCode } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";
import "./ResetPassword.css";

// Inner client component that uses useSearchParams. This is wrapped in a Suspense boundary by the page export.
function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const oobCode = searchParams.get("oobCode");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (oobCode) {
      verifyPasswordResetCode(auth, oobCode)
        .then((email) => setEmail(email))
        .catch(() => setMessage("Invalid or expired password reset link."));
    }
  }, [oobCode]);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    if (!oobCode) {
      setMessage("Invalid or missing reset code. Please use the link from your email.");
      return;
    }

    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      setMessage("You may now proceed to the game and log in again.");
      setTimeout(() => router.push("/Login"), 3000);
    } catch (error) {
      console.error(error);
      setMessage("Failed to reset password. Please try again.");
    }
  };

  return (
    <div className="reset-container">
      <div className="reset-card">
        <h2>RESET YOUR PASSWORD</h2>
        {email && <p className="email-text">for {email}</p>}

        <form onSubmit={handleResetPassword}>
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit">Save</button>
        </form>

        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}

export default function ResetPasswordDashboard() {
  return (
    <Suspense fallback={<div className="reset-container"><div className="reset-card"><p>Loading...</p></div></div>}>
      <ResetPasswordContent />
    </Suspense>
  );
}
