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
          <li><a href="#contact">Contact</a></li>
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
              CodeMaster follows Alliee, a 4th-year student trapped in a digital world overrun by
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
      <section id="team" className="section team-section">
        <h2 className="section-title">Developers</h2>

        <div className="team-lead-wrap flex justify-center">
          <div className="team-card team-lead w-72 sm:w-80 md:w-96">
            <img src="/Miranda.png" alt="Kate Crystal Miranda" className="team-avatar" />
            <h3 className="team-name">Kate Crystal Miranda</h3>
            <p className="team-role">Project Manager</p>
          </div>
        </div>

        <div className="team-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
          <div className="team-card w-72 sm:w-80 md:w-96">
            <img src="/Garcia.jpg" alt="April Joy Garcia" className="team-avatar" />
            <h3 className="team-name">April Joy Garcia</h3>
            <p className="team-role">Game Designer</p>
          </div>
          <div className="team-card w-72 sm:w-80 md:w-96">
            <img src="/Abad.jpg" alt="Gem Anthoinette Abad" className="team-avatar" />
            <h3 className="team-name">Gem Anthoinette Abad</h3>
            <p className="team-role">Quality Assurance / Document Writer</p>
          </div>
          <div className="team-card w-72 sm:w-80 md:w-96">
            <img src="/Saul.jpg" alt="Wesly Saul" className="team-avatar" />
            <h3 className="team-name">Wesly Saul</h3>
            <p className="team-role">Game Programmer</p>
          </div>
        </div>
      </section>

{/* CONTACT SECTION */}
<section
  id="contact"
  className="section contact-section py-16 px-6 bg-black flex flex-col md:flex-row items-center justify-center gap-10 text-white"
>
  {/* LEFT SIDE IMAGE */}
  <div className="w-full md:w-1/2 flex justify-center">
    <img
      src="/alliebgcontact.png" 
      alt="Contact Us"
      className="w-80 sm:w-96 md:w-[420px] rounded-xl shadow-lg object-cover"
    />
  </div>

  {/* RIGHT SIDE FORM */}
  <div className="w-full md:w-1/2 lg:w-[65%] flex justify-center">
    <FeedbackForm />
  </div>

  
</section>

{/* FOOTER */}
<footer className="footer w-full bg-black flex flex-col md:flex-row items-center justify-between text-white px-6 py-4">
  {/* Left side: Email & Phone */}
  <div className="text-sm text-gray-300 text-center md:text-left space-y-1 md:space-y-0 md:space-x-4">
    <span>Email: CODEMASTER@gmail.com</span>
    <span className="block md:inline">Phone: +63 945 150 2417</span>
  </div>

  {/* Right side: Copyright */}
  <p className="muted text-sm text-gray-400 mt-2 md:mt-0">&copy; CODEMASTER 2025 </p>
</footer>

    </>
  );
} 
