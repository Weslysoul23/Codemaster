"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getDatabase,
  ref,
  get,
  update,
  onValue,
} from "firebase/database";
import { auth } from "@/lib/firebaseConfig";
import { X, User, Lock, Eye, EyeOff, Download } from "lucide-react";

interface LoginModalProps {
  isLoginOpen: boolean;
  closeLogin: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isLoginOpen, closeLogin }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  // 🔹 Handle login logic
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsLoading(true);
  setError(null);

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    );

    const user = userCredential.user;

    const dbRT = getDatabase();
    const userRef = ref(dbRT, `users/${user.uid}`);
    const snapshot = await get(userRef);

    if (snapshot.exists()) {
      const data = snapshot.val();
      console.log("Fetched user data:", data); // ✅ Debug

      if (data.status === "disabled") {
        await signOut(auth);
        alert(
          `Your account has been disabled.\n\nReason: ${
            data.disableReason || "No reason provided."
          }`
        );
        return;
      }
    }

    // 🔹 Redirect based on role
    if (user.email?.toLowerCase() === "codemaster@gmail.com") {
      router.push("/admin-dashboard");
    } else {
      router.push("/player-dashboard");
    }

  } catch (err: any) {
    console.error("Login error:", err);
    if (err.code === "auth/user-not-found") {
      setError("No user found. Try creating the account in the game app.");
    } else if (err.code === "auth/wrong-password") {
      setError("Incorrect password.");
    } else {
      setError(err.message || "An error occurred during login.");
    }
  } finally {
    setIsLoading(false);
  }
};


  return (
    <>
      {isLoginOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black bg-opacity-20 backdrop-blur-sm"
            onClick={closeLogin}
          />
          <div className="relative bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            <button
              onClick={closeLogin}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
            >
              <X size={24} />
            </button>

            <div className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">
                  Welcome Back
                </h2>
                <p className="text-white text-opacity-80">
                  Sign in to your account
                </p>
              </div>

              {error && <p className="text-red-500 text-center mb-4">{error}</p>}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={20} className="text-white text-opacity-60" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-white placeholder-opacity-60 focus:outline-none focus:border-white focus:border-opacity-40 transition-colors"
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={20} className="text-white text-opacity-60" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    required
                    className="w-full pl-10 pr-12 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-white placeholder-opacity-60 focus:outline-none focus:border-white focus:border-opacity-40 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-white text-opacity-60 hover:text-opacity-100 transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                <div className="text-right">
                  <a
                    href="/Forgotpassword-Dashboard"
                    className="text-sm text-blue-400 hover:underline hover:text-blue-300 transition-colors"
                  >
                    Forgot Password?
                  </a>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 transition-all duration-200 flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </button>

                {/* 🧩 Create Account / Download Game */}
                <div className="text-center mt-4">
                  <p className="text-white text-opacity-70 text-sm">
                    Don’t have an account? Download the Game to sign up.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      
    </>
  );
};

export default LoginModal;
