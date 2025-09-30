"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import "./globals.css";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [selectedChar, setSelectedChar] = useState<any>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const characters = [
    {
      name: "Allie",
      role: "Heroine",
      description:
        "Allie - A college girl who gets pulled into the digital world. She must restore peace in the chaotic realm to return home.",
      img: "/Allie.png",
    },
    {
      name: "Nexus",
      role: "Guide / Teacher",
      description:
        "Nexus - An AI robot guide who mentors Allie, teaching her coding skills and strategies to defeat enemies.",
      img: "/Nexus.png",
    },
    {
      name: "Cyber Zombie",
      role: "Enemy",
      description:
        "Cyber Zombie - Corrupted beings of the digital world, spreading chaos and standing in the way of peace.",
      img: "/CyberZombies.png",
    },
  ];

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
            CODEMASTER
          </span>
        </a>

        <ul className="hidden md:flex gap-8 text-sm font-medium nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#characters">Characters</a></li>
          <li><a href="#team">Team</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>

        <div className="nav-actions">
          <a href="codemaster.zip" download>
            <Button variant="secondary">Download</Button>
          </a>
        </div>
      </nav>

      {/* HERO */}
      <header
        id="home"
        className="hero relative flex items-center justify-center text-center"
        style={{
          backgroundImage: "url('/CodeMaster-Poster.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1 className="glitch hero-title" data-text="CODEMASTER">CODEMASTER</h1>
          <p className="hero-sub">A Cyberpunk World Where Code is Your Weapon.</p>
          <div className="mt-6">
            <a href="codemaster.zip" download>
              <Button className="download-btn">Download Now</Button>
            </a>
          </div>
        </div>
      </header>

      {/* ABOUT (split: left text, right YouTube embed) */}
      <section id="about" className="section about-section">
        <h2 className="section-title">About the Game</h2>
        <div className="about-grid">
          <div className="about-left">
            <p className="about-text">
              Codemaster is a <strong>story mode adventure game</strong> where players learn <strong>C# programming</strong>
              while battling through a chaotic cyber world. You play as <strong>Allie</strong>, a college girl trapped inside
              the digital realm, who must restore peace by mastering coding concepts. Guided by <strong>Nexus</strong>, an AI
              mentor, you’ll use logic and programming skills to fight off <strong>Cyber Zombies</strong> and bring balance back
              to the system.
            </p>
          </div>

          <div className="about-right">
            <iframe
              src="https://www.youtube.com/embed/x-2w7rNP7ek"
              title="CODEMASTER Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* CHARACTERS: icons left, info right */}
      <section id="characters" className="section characters-section">
        <h2 className="section-title">Main Characters</h2>
        <div className="characters-grid">
          <div className="character-icons">
            {characters.map((c) => (
              <button
                key={c.name}
                className={`char-icon ${selectedChar?.name === c.name ? "active" : ""}`}
                onClick={() => setSelectedChar(c)}
                title={c.name}
              >
                <img src={c.img} alt={c.name} />
              </button>
            ))}
          </div>

          <div className="character-info-panel">
            {selectedChar ? (
              <>
                <img className="character-large" src={selectedChar.img} alt={selectedChar.name} />
                <h3 className="character-name">{selectedChar.name}</h3>
                <p className="character-role">{selectedChar.role}</p>
                <p className="character-desc">{selectedChar.description}</p>
              </>
            ) : (
              <p className="muted">Click a character icon to see details here.</p>
            )}
          </div>
        </div>
      </section>

      {/* TEAM / DEVELOPERS (Kate centered, others below) */}
      <section id="team" className="section team-section">
        <h2 className="section-title">Developers / Team</h2>

        {/* Top center - Kate Crystal Miranda */}
        <div className="team-lead-wrap">
          <div className="team-card team-lead">
            <img src="/Miranda.png" alt="Kate Crystal Miranda" className="team-avatar" />
            <h3 className="team-name">Kate Crystal Miranda</h3>
            <p className="team-role">Project Manager</p>
          </div>
        </div>

        {/* Row below - the other three */}
        <div className="team-grid">
          <div className="team-card">
            <img src="/Garcia.jpg" alt="April Joy Garcia" className="team-avatar" />
            <h3 className="team-name">April Joy Garcia</h3>
            <p className="team-role">Game Designer</p>
          </div>

          <div className="team-card">
            <img src="/Abad.jpg" alt="Gem Anthoinette Abad" className="team-avatar" />
            <h3 className="team-name">Gem Anthoinette Abad</h3>
            <p className="team-role">Quality Assurance / Document Writer</p>
          </div>

          <div className="team-card">
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
    </>
  );
}
