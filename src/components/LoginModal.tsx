"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getDatabase, ref, get } from "firebase/database";
import { auth } from "@/lib/firebaseConfig";
import { X, User, Lock, Eye, EyeOff } from "lucide-react";

const LoginModal = ({ isLoginOpen, closeLogin }: any) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [warning, setWarning] = useState<string | null>(null); // ⚠️ Added warning state
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const openTerms = () => setIsTermsOpen(true);
  const closeTerms = () => setIsTermsOpen(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // ⚠️ ADDED THIS CONDITION: block login if Terms not checked
    if (!acceptedTerms) {
      setWarning("⚠️ You must read and accept the Terms and Conditions before signing in.");
      return;
    }

    setWarning(null); // clear any previous warning
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
        if (data.status === "disabled") {
          await signOut(auth);
          alert(`Your account has been disabled.\n\nReason: ${data.disableReason || "No reason provided."}`);
          return;
        }
      }

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

              {/* ⚠️ WARNING MESSAGE DISPLAY */}
              {warning && (
                <p className="text-yellow-400 text-center mb-3">{warning}</p>
              )}

              {error && <p className="text-red-500 text-center mb-4">{error}</p>}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email */}
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

                {/* Password */}
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

                {/* ✅ TERMS CHECKBOX + FORGOT PASSWORD */}
                <div className="flex justify-between items-center text-sm text-white">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={acceptedTerms}
                      onChange={(e) => setAcceptedTerms(e.target.checked)}
                      className="accent-blue-500 cursor-pointer"
                    />
                    <span>I have read the</span>
                    <button
                      type="button"
                      onClick={openTerms}
                      className="hover:text-white underline transition text-blue-400"
                    >
                      Terms & Conditions
                    </button>
                  </label>

                  <a
                    href="/Forgotpassword-Dashboard"
                    className="hover:underline text-blue-400 transition"
                  >
                    Forgot Password?
                  </a>
                </div>

                {/* Sign In */}
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

      {/* TERMS & CONDITIONS MODAL */}
      {isTermsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-gray-900 text-white p-6 rounded-xl max-w-3xl w-full relative">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
              onClick={closeTerms}
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold mb-4">CodeMaster – Terms and Conditions</h2>
            <p className="text-sm mb-2">Last Updated: November 2025</p>
            <div className="overflow-y-auto max-h-96 space-y-2 text-gray-300 text-sm">
              <ol className="list-decimal list-inside space-y-1">
                <li><strong>Acceptance of Terms:</strong> By accessing or using CodeMaster, you acknowledge that you have read, understood, and agree to comply with these Terms and Conditions. If you do not agree, please do not continue to use the game.</li>
                <li><strong>Account Registration:</strong> Players may be required to create an account to access certain features. You agree to provide accurate and current information during registration. You are responsible for maintaining the confidentiality of your account and password.</li>
                <li><strong>Educational Purpose:</strong> CodeMaster is an educational game created to teach and enhance programming knowledge, particularly in C# and computer logic concepts. It is not intended for gambling, profit-making, or commercial resale.</li>
                <li><strong>Game Data and Progress:</strong> The game may collect and store your gameplay data, including scores, achievements, and progress. Data may be used to display leaderboards or for research and educational purposes. Your data will not be sold or shared with third parties without your consent.</li>
                <li><strong>Fair Play:</strong> Players must not: use cheats, hacks, or unauthorized modifications; exploit bugs or glitches to gain unfair advantages; harass, spam, or behave inappropriately toward other players. Violation of these rules may result in account suspension or deletion.</li>
                <li><strong>Intellectual Property:</strong> All game content, including designs, characters, logos, audio, and code, is the property of the CodeMaster Development Team and its creators. You may not reproduce, modify, or distribute any part of the game without permission.</li>
                <li><strong>Updates and Changes:</strong> The CodeMaster team may update or modify the game and its features at any time. These changes may include gameplay adjustments, bug fixes, or new educational content.</li>
                <li><strong>Limitation of Liability:</strong> CodeMaster and its developers are not responsible for any data loss, hardware issues, or other damages resulting from the use of the game. The game is provided “as is” without warranties of any kind.</li>
                <li><strong>Privacy and Security:</strong> Your privacy is important to us. CodeMaster follows strict data security protocols to protect your information. For more details, refer to the Privacy Policy (if applicable).</li>
                <li><strong>Termination:</strong> The CodeMaster team reserves the right to terminate or restrict access to your account if you violate these terms or misuse the game in any way.</li>
                <li><strong>Refund Policy:</strong> We do not offer refunds after purchasing any subscription or paid content. Please review your purchase carefully before proceeding.</li>
                <li><strong>Contact:</strong> For questions, feedback, or technical support, please contact the CodeMaster team through our website <a href="https://codemaster-thesis.vercel.app/" className="underline text-blue-400">here</a>.</li>
              </ol>
            </div>
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={closeTerms}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded"
              >
                Decline
              </button>
              <button
                onClick={() => {
                  closeTerms();
                  setAcceptedTerms(true);
                  alert("You accepted the Terms and Conditions.");
                }}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded text-white"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginModal;
