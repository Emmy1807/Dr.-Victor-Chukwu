"use client";

import { useState } from "react";

export default function BookingPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "Teaching invitation",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setSubmitStatus({
          type: "error",
          message: data.error || "Failed to submit inquiry",
        });
        return;
      }

      setSubmitStatus({
        type: "success",
        message: "Your inquiry has been submitted! We'll be in touch soon.",
      });
      setFormData({
        name: "",
        email: "",
        type: "Teaching invitation",
        message: "",
      });
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus({
        type: "error",
        message: "An error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-8 px-4 py-12">
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
          Booking
        </p>
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Invite or book a session
        </h1>
        <p className="max-w-2xl text-sm text-slate-300 md:text-base">
          Use this form to inquire about teaching invitations, mentorship
          sessions, counseling, or event appearances.
        </p>
      </header>

      <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 text-sm text-slate-300">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-1 text-xs">
            <label htmlFor="name" className="block text-slate-200">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-50 outline-none focus:border-amber-400"
              placeholder="Your full name"
              required
            />
          </div>
          <div className="space-y-1 text-xs">
            <label htmlFor="email" className="block text-slate-200">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-50 outline-none focus:border-amber-400"
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="space-y-1 text-xs">
            <label htmlFor="type" className="block text-slate-200">
              Booking type
            </label>
            <select
              id="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-50 outline-none focus:border-amber-400"
            >
              <option>Teaching invitation</option>
              <option>Mentorship session</option>
              <option>Counseling / prayer</option>
              <option>Event appearance</option>
            </select>
          </div>
          <div className="space-y-1 text-xs">
            <label htmlFor="message" className="block text-slate-200">
              Message / details
            </label>
            <textarea
              id="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-50 outline-none focus:border-amber-400"
              placeholder="Share dates, context, and any other helpful information."
              required
            />
          </div>

          {submitStatus && (
            <div
              className={`rounded-lg p-3 text-xs ${submitStatus.type === "success"
                  ? "bg-green-900/30 text-green-200 border border-green-700"
                  : "bg-red-900/30 text-red-200 border border-red-700"
                }`}
            >
              {submitStatus.message}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex w-full items-center justify-center rounded-full bg-amber-400 px-4 py-2 text-xs font-medium text-slate-950 hover:bg-amber-300 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {isLoading ? "Submitting..." : "Submit inquiry"}
          </button>
        </form>
      </section>
    </div>
  );
}
