"use client";
import React, { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { X, User, Lock, Eye, EyeOff } from "lucide-react";
import SliderChar from "@/components/ui/sliderChar";
import "./globals.css";

interface LoginFormData {
  username: string;
  password: string;
}

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

  // === Demo User Login ===
  const DEMO_USERS = [
    { username: "player", password: "123456", role: "player" },
    { username: "admin", password: "admin123", role: "admin" },
  ];

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [formData, setFormData] = useState<LoginFormData>({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // === Scroll Effect ===
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  

  

  // === LOGIN LOGIC ===
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const foundUser = DEMO_USERS.find(
        (u) => u.username === formData.username && u.password === formData.password
      );

      if (foundUser) {
        alert(`Welcome, ${foundUser.role.toUpperCase()}!`);
        setIsLoginOpen(false);
        // Redirect
        if (foundUser.role === "admin") {
          window.location.href = "/admin-dashboard";
        } else {
          window.location.href = "/player-dashboard";
        }
      } else {
        alert("Invalid credentials.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const openLogin = () => setIsLoginOpen(true);
  const closeLogin = () => {
    setIsLoginOpen(false);
    setFormData({ username: "", password: "" });
    setShowPassword(false);
  };

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
          <Button
            variant="secondary"
            onClick={openLogin}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Login
          </Button>
        </div>
      </nav>

      {/* HERO */}
      <header
        id="home"
        className="hero relative flex items-center justify-center text-center"
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
            <Button className="download-btn">Play Now</Button>
          </div>
        </div>
      </header>

      {/* ABOUT */}
      <section id="about" className="section about-section">
        <h2 className="section-title">About the Game</h2>
        <div className="about-grid">
          <div className="about-left">
            <p className="about-text text-sm sm:text-base md:text-lg leading-relaxed">
              CodeMaster follows Allieee, a 4th-year student trapped in a digital world overrun by
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

        <div className="team-lead-wrap">
          <div className="team-card team-lead w-72 sm:w-80 md:w-96">
            <img src="/Miranda.png" alt="Kate Crystal Miranda" className="team-avatar" />
            <h3 className="team-name">Kate Crystal Miranda</h3>
            <p className="team-role">Project Manager</p>
          </div>
        </div>

        <div className="team-grid">
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

      {/* CONTACT */}
      <section id="contact" className="section contact-section">
        <h2 className="section-title">Contact</h2>
        <p className="muted">Email: CODEMASTER@gmail.com</p>
        <p className="muted">Phone: +63 945 150 2417</p>
      </section>

      <footer className="footer">
        <p className="muted">&copy; 2025 CODEMASTER</p>
      </footer>

      {/* LOGIN MODAL (replaces your old one) */}
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
                <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
                <p className="text-white text-opacity-80">Sign in to your account</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Username */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={20} className="text-white text-opacity-60" />
                  </div>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Enter your username"
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

                {/* Submit */}
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
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 
