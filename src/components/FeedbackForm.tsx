"use client";
import React, { useState } from "react";
import { submitFeedback } from "@/lib/firestore";

export default function FeedbackForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("Sending...");

    const result = await submitFeedback(form);

    if (result.success) {
      setStatus("✅ Message sent successfully!");
      setForm({ name: "", email: "", subject: "", message: "" });
    } else {
      setStatus("❌ Failed: " + result.error);
    }
  }

  return (
    <div className="w-full md:w-[45%] lg:w-[40%] xl:w-[55%] bg-gradient-to-b from-[#0B1221] via-[#0A1020] to-[#0E1628] border border-[#1B2A49] rounded-xl shadow-lg shadow-blue-900/20 p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-3 text-center bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(0,204,255,0.4)]">
        Send Us Your Feedbacks
      </h2>
      <p className="text-center mb-6 text-gray-400 text-xs sm:text-sm leading-relaxed">
        Have a question about CodeMaster, development, or collaborations? Reach out and we’ll get back to
        you soon.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            className="bg-[#121A2E] border border-[#1C2B4D] rounded-md p-2.5 w-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/60 text-sm"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
            className="bg-[#121A2E] border border-[#1C2B4D] rounded-md p-2.5 w-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/60 text-sm"
          />
        </div>

        <input
          type="text"
          name="subject"
          value={form.subject}
          onChange={handleChange}
          placeholder="Subject"
          required
          className="bg-[#121A2E] border border-[#1C2B4D] rounded-md p-2.5 w-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/60 text-sm"
        />

        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Write your message here..."
          required
          rows={3}
          className="bg-[#121A2E] border border-[#1C2B4D] rounded-md p-2.5 w-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/60 resize-none text-sm"
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-2.5 rounded-md font-semibold tracking-wide text-sm hover:opacity-90 hover:shadow-[0_0_10px_rgba(0,255,255,0.4)] transition duration-200"
        >
          SEND FEEDBACK
        </button>

        <p className="text-center text-sm text-gray-300 mt-2">{status}</p>
      </form>
    </div>
  );
}

