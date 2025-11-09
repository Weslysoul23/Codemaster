"use client";
import React, { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { X, User, Lock, Eye, EyeOff } from "lucide-react";
import SliderChar from "@/components/ui/sliderChar";
import LoginModal from "@/components/LoginModal";
import FeedbackForm from "@/components/FeedbackForm";
import "./globals.css";

export default function Home() {
  // === Navbar Scroll ===
  const [scrolled, setScrolled] = useState(false);

  const carouselRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // === Auto Slide Effect ===
  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        carouselRef.current.scrollLeft += 300; // scroll distance
        if (
          carouselRef.current.scrollLeft + carouselRef.current.clientWidth >=
          carouselRef.current.scrollWidth
        ) {
          // Loop back to start
          carouselRef.current.scrollLeft = 0;
        }
      }
    }, 3000); // 3s per slide

    return () => clearInterval(interval);
  }, []);

  // === Login Modal ===
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const openLogin = () => setIsLoginOpen(true);
  const closeLogin = () => setIsLoginOpen(false);

  // === Terms & Conditions Modal ===
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const openTerms = () => setIsTermsOpen(true);
  const closeTerms = () => setIsTermsOpen(false);

  // === Scroll Effect ===
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // === PAGE RENDER ===
  return (
    <>
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 px-6 py-4 flex items-center justify-between transition-all duration-300 ${
          scrolled ? "nav-scrolled" : "nav-transparent"
        }`}
      >
        <a href="#home" className="logo-link">
          <span className="glitch" data-text="CODEMASTER">
            <strong>CODEMASTER</strong>
          </span>
        </a>

        <ul className="hidden md:flex gap-6 lg:gap-8 text-xs sm:text-sm font-medium nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#characters">Characters</a></li>
          <li><a href="#team">Developers</a></li>
          <li><a href="#faq">FAQ</a></li>
          <li><a href="#contact">Feedback</a></li>
        </ul>

        <div className="nav-actions">
          <button
            onClick={openLogin}
            className="bg-gradient-to-r from-blue-400 to-blue-600 text-white py-2 px-4 rounded font-semibold hover:from-blue-500 hover:to-blue-700 transition-all duration-200"
          >
            Login
          </button>
          <LoginModal isLoginOpen={isLoginOpen} closeLogin={closeLogin} />
        </div>
      </nav>

      {/* HERO */}
      <header
        id="home"
        className="w-full max-w-none hero relative flex items-center justify-center text-center"
        style={{
          backgroundImage: "url('/programming.gif')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1 className="glitch hero-title" data-text="CODEMASTER">
            <strong>CODEMASTER</strong>
          </h1>
          <p className="hero-sub">
            “The world’s last defense isn’t a gun — it’s a line of code.”
          </p>
          <div className="mt-6">
            <a
              href="https://zemwbhmykpjcaw3z.public.blob.vercel-storage.com/Codemaster.zip"
              download
            >
              <Button className="download-btn">Download</Button>
            </a>
          </div>
        </div>
      </header>

      {/* ABOUT */}
      <section id="about" className="section about-section">
        <h2 className="section-title">About the Game</h2>
        <div className="about-grid">
          <div className="about-left">
            <p className="about-text text-sm sm:text-base md:text-lg leading-relaxed">
              CodeMaster follows Allie, a 4th-year student trapped in a digital world overrun by
              cyberzombies. Guided by the AI mentor Nexus, she must use her C# coding skills to
              restore peace, craft weapons, and outsmart enemies.
            </p>
          </div>
          <div className="about-right">
            <iframe
              src="https://www.youtube.com/embed/x-2w7rNP7ek"
              title="CODEMASTER Trailer"
              frameBorder="0"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* CHARACTER SECTION */}
      <section id="characters" className="py-20 bg-black">
        <h2 className="text-center text-4xl font-bold text-white mb-10">Characters</h2>
        <div className="max-w-5xl mx-auto">
          <SliderChar />
        </div>
      </section>

      {/* DEVELOPERS */}
      <section id="team" className="bg-black text-white py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-blue-400">
          Developers
        </h2>
        <div className="team-lead-wrap flex justify-center mb-12">
          <div className="team-card team-lead w-72 sm:w-80 md:w-96 bg-gray-900 border border-blue-500/40 rounded-xl p-6 text-center hover:border-blue-400 transition">
            <img
              src="/Miranda.png"
              alt="Kate Crystal Miranda"
              className="team-avatar w-40 h-40 mx-auto rounded-full object-cover border-2 border-blue-400 mb-4"
            />
            <h3 className="team-name text-xl font-semibold text-blue-400">
              Kate Crystal Miranda
            </h3>
            <p className="team-role text-gray-300">Project Manager</p>
          </div>
        </div>
        <div className="team-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
          <div className="team-card w-72 sm:w-80 md:w-96 bg-gray-900 border border-blue-500/40 rounded-xl p-6 text-center hover:border-blue-400 transition">
            <img
              src="/Garcia.jpg"
              alt="April Joy Garcia"
              className="team-avatar w-40 h-40 mx-auto rounded-full object-cover border-2 border-blue-400 mb-4"
            />
            <h3 className="team-name text-xl font-semibold text-blue-400">
              April Joy Garcia
            </h3>
            <p className="team-role text-gray-300">Game Designer</p>
          </div>
          <div className="team-card w-72 sm:w-80 md:w-96 bg-gray-900 border border-blue-500/40 rounded-xl p-6 text-center hover:border-blue-400 transition">
            <img
              src="/Abad.jpg"
              alt="Gem Anthoinette Abad"
              className="team-avatar w-40 h-40 mx-auto rounded-full object-cover border-2 border-blue-400 mb-4"
            />
            <h3 className="team-name text-xl font-semibold text-blue-400">
              Gem Anthoinette Abad
            </h3>
            <p className="team-role text-gray-300">
              Quality Assurance / Document Writer
            </p>
          </div>
          <div className="team-card w-72 sm:w-80 md:w-96 bg-gray-900 border border-blue-500/40 rounded-xl p-6 text-center hover:border-blue-400 transition">
            <img
              src="/Saul.jpg"
              alt="Wesly Saul"
              className="team-avatar w-40 h-40 mx-auto rounded-full object-cover border-2 border-blue-400 mb-4"
            />
            <h3 className="team-name text-xl font-semibold text-blue-400">
              Wesly Saul
            </h3>
            <p className="team-role text-gray-300">Game Programmer</p>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section
        id="faq"
        className="section faq-section py-16 px-6 bg-black text-white flex justify-center"
      >
        <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl gap-6">
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-blue-400">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-400 mb-6 text-sm sm:text-base leading-relaxed">
              Learn more about CodeMaster — from downloading the game to understanding its story and gameplay.
            </p>

            <div className="space-y-3">
              {/* FAQ items unchanged */}
            </div>
          </div>
          <div className="w-full md:w-1/3 flex justify-center">
            <img 
              src="/logorb.png" 
              alt="CodeMaster Orb" 
              style={{ width: '325px', maxWidth: '150%', height: 'auto' }}
              className="rounded-xl shadow-lg object-cover" 
            />
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section
        id="contact"
        className="section contact-section py-16 px-6 bg-black flex justify-center"
      >
        <div className="flex flex-col md:flex-row items-start justify-center w-full max-w-6xl gap-4">
          <div className="md:w-1/2 w-full flex justify-end">
            <img
              src="/alliebgcontact.png"
              alt="Contact Us"
              style={{ width: '300px', maxWidth: '150%', height: 'auto' }}
              className="rounded-xl shadow-lg object-cover"
            />
          </div>
          <div className="w-full md:w-1/2 lg:w-[70%] flex justify-center">
            <FeedbackForm />
          </div>
        </div>
      </section>

      {/* FOOTER SECTION */}
      <footer className="bg-[#0a0f1c] text-gray-300 py-10 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* LEFT COLUMN */}
          <div>
            <h3 className="text-white text-2xl font-bold mb-2">CodeMaster</h3>
            <div className="h-1 w-12 bg-blue-500 mb-4"></div>
            <p className="text-sm leading-relaxed">
              CodeMaster — an educational adventure game where you fight cyber zombies using programming logic 
              and problem-solving skills to restore the digital world.
            </p>
          </div>
          {/* MIDDLE COLUMN */}
          <div>
            <h3 className="text-white text-2xl font-bold mb-2">Quick Links</h3>
            <div className="h-1 w-12 bg-blue-500 mb-4"></div>
            <ul className="space-y-2 text-sm">
              <li><a href="#home" className="hover:text-white transition">Home</a></li>
              <li><a href="#about" className="hover:text-white transition">About</a></li>
              <li><a href="#characters" className="hover:text-white transition">Characters</a></li>
              <li><a href="#team" className="hover:text-white transition">Developers</a></li>
              <li><a href="#faq" className="hover:text-white transition">FAQ</a></li>
              <li><a href="#contact" className="hover:text-white transition">Feedback</a></li>
            </ul>
          </div>
          {/* RIGHT COLUMN */}
          <div>
            <h3 className="text-white text-2xl font-bold mb-2">Have Questions?</h3>
            <div className="h-1 w-12 bg-blue-500 mb-4"></div>
            <ul className="space-y-2 text-sm">
              <li>Building 2 Aguinaldo Highway,<br />Dasmariñas City, Cavite, Philippines</li>
              <li>codemaster@primastron.org</li>
              <li>
                <button 
                  onClick={openTerms} 
                  className="hover:text-white underline transition text-sm"
                >
                  Terms & Conditions
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center text-xs text-gray-400 mt-10">
          © 2025 All rights reserved | CodeMaster by PrimAstron
        </div>
      </footer>

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
              <p>
                Welcome to CodeMaster, a 3D coding adventure game designed to help players learn 
                and improve their programming skills through interactive gameplay. Before you log in 
                and start playing, please read these Terms and Conditions carefully. By creating an 
                account or playing the game, you agree to be bound by these terms.
              </p>
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
}
