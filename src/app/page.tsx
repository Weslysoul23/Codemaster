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
          <p className="hero-sub">“The world’s last defense isn’t a gun — it’s a line of code.”</p>
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

      {/* CHARACTER SECTION WITH SLIDER */}
      <section id="characters" className="py-20 bg-black">
        <h2 className="text-center text-4xl font-bold text-white mb-10">Characters</h2>

        {/* Character Slider */}
        <div className="max-w-5xl mx-auto">
          <SliderChar />
        </div>
      </section>

      {/* DEVELOPERS */}
<section id="team" className="bg-black text-white py-16 px-6">
  <h2 className="text-3xl font-bold text-center mb-12 text-blue-400">
    Developers
  </h2>

  {/* Team Lead */}
  <div className="team-lead-wrap flex justify-center mb-12">
    <div className="team-card team-lead w-72 sm:w-80 md:w-96 bg-gray-900 border border-blue-500/40 rounded-xl p-6 text-center transition">
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

  {/* Team Members */}
  <div className="team-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
    <div className="team-card w-72 sm:w-80 md:w-96 bg-gray-900 border border-blue-500/40 rounded-xl p-6 text-center transition">
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

    <div className="team-card w-72 sm:w-80 md:w-96 bg-gray-900 border border-blue-500/40 rounded-xl p-6 text-center transition">
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

    <div className="team-card w-72 sm:w-80 md:w-96 bg-gray-900 border border-blue-500/40 rounded-xl p-6 text-center transition">
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
  {/* WRAPPER FOR FAQ + IMAGE */}
  <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl gap-6">
    
    {/* LEFT SIDE FAQ */}
    <div className="w-full md:w-1/2">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-blue-400">
        Frequently Asked Questions
      </h2>
      <p className="text-gray-400 mb-6 text-sm sm:text-base leading-relaxed">
        Learn more about CodeMaster — from downloading the game to understanding its story and gameplay.
      </p>

      <div className="space-y-3">
        {/* FAQ 1 */}
        <details className="group bg-gray-900/60 p-4 rounded-xl border border-gray-700 hover:border-blue-500 transition">
          <summary className="flex justify-between items-center cursor-pointer font-semibold text-blue-400 text-sm sm:text-base">
            How Can I Download CodeMaster?
            <span className="transition-transform group-open:rotate-180 text-gray-400">−</span>
          </summary>
          <div className="mt-2 text-gray-300 text-sm leading-relaxed">
            You can download CodeMaster directly from our official website or from the download link on the homepage.
            Make sure to install all necessary dependencies for the best performance.
          </div>
        </details>

        {/* FAQ 2 */}
        <details className="group bg-gray-900/60 p-4 rounded-xl border border-gray-700 hover:border-blue-500 transition">
          <summary className="flex justify-between items-center cursor-pointer font-semibold text-blue-400 text-sm sm:text-base">
            What Is CodeMaster About?
            <span className="transition-transform group-open:rotate-180 text-gray-400">−</span>
          </summary>
          <div className="mt-2 text-gray-300 text-sm leading-relaxed">
            CodeMaster follows Alliee, a student trapped in a digital world overrun by cyber zombies. 
            Guided by an AI named Nexus, she must use her coding skills to restore balance.
          </div>
        </details>

        {/* FAQ 3 */}
        <details className="group bg-gray-900/60 p-4 rounded-xl border border-gray-700 hover:border-blue-500 transition">
          <summary className="flex justify-between items-center cursor-pointer font-semibold text-blue-400 text-sm sm:text-base">
            Can I Play Offline?
            <span className="transition-transform group-open:rotate-180 text-gray-400">−</span>
          </summary>
          <div className="mt-2 text-gray-300 text-sm leading-relaxed">
            Yes! You can play CodeMaster offline after installation. However, online features such as leaderboards
            and account login will require an internet connection.
          </div>
        </details>

        {/* FAQ 4 */}
        <details className="group bg-gray-900/60 p-4 rounded-xl border border-gray-700 hover:border-blue-500 transition">
          <summary className="flex justify-between items-center cursor-pointer font-semibold text-blue-400 text-sm sm:text-base">
            Who Developed CodeMaster?
            <span className="transition-transform group-open:rotate-180 text-gray-400">−</span>
          </summary>
          <div className="mt-2 text-gray-300 text-sm leading-relaxed">
            CodeMaster was developed by <strong>PrimAstron</strong>, a student team from Cavite:
            Kate Crystal Miranda (Project Manager), April Joy Garcia (Game Designer),
            Gem Anthoinette Abad (QA/Writer), and Wesly Saul (Programmer).
          </div>
        </details>
      </div>
    </div>

    {/* RIGHT SIDE IMAGE */}
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
  {/* WRAPPER FOR IMAGE + FORM */}
  <div className="flex flex-col md:flex-row items-start justify-center w-full max-w-6xl gap-4">
    
    {/* LEFT SIDE IMAGE */}
    <div className="md:w-1/2 w-full flex justify-end">
      <img
        src="/alliebgcontact.png"
        alt="Contact Us"
        style={{ width: '300px', maxWidth: '150%', height: 'auto' }}
        className="rounded-xl shadow-lg object-cover"
      />
    </div>

    {/* RIGHT SIDE FORM */}
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
      </ul>
    </div>
  </div>

  <div className="text-center text-xs text-gray-400 mt-10">
    © 2025 All rights reserved | CodeMaster by PrimAstron
  </div>
</footer>


    </>
  );
} 
  