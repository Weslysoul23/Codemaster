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
    <div className="w-full md:w-[45%] lg:w-[40%] xl:w-[55%] bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900 rounded-xl shadow-xl p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-2 text-center bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
        Send Us Your Feedbacks
      </h2>
      <p className="text-center mb-5 text-gray-400 text-xs sm:text-sm leading-relaxed">
        Have a question about CodeMaster, development, or collaborations? Reach out and we’ll get back to
        you soon.
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            className="bg-gray-800 rounded-md p-2 w-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
            className="bg-gray-800 rounded-md p-2 w-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>

        <input
          type="text"
          name="subject"
          value={form.subject}
          onChange={handleChange}
          placeholder="Subject"
          required
          className="bg-gray-800 rounded-md p-2 w-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />

        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Write your message here..."
          required
          rows={3}
          className="bg-gray-800 rounded-md p-2 w-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm"
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-2 rounded-md font-semibold tracking-wide text-sm hover:opacity-90 transition duration-200"
        >
          SEND FEEDBACK
        </button>

        <p className="text-center text-sm text-gray-300 mt-2">{status}</p>
      </form>
    </div>
  );
}
