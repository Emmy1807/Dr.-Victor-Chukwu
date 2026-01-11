"use client";

import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    setMessage("");

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data?.error) {
          setMessage(data.error);
        } else {
          setMessage("Unable to start reset process. Please try again.");
        }
        setStatus("error");
        return;
      }

      setStatus("success");
      setMessage(
        "If an account exists with that email, a password reset link has been sent. Please check your inbox."
      );
    } catch (err) {
      console.error(err);
      setStatus("error");
      setMessage("An error occurred. Please try again.");
    } finally {
      setStatus((prev) => (prev === "submitting" ? "idle" : prev));
    }
  }

  const isSubmitting = status === "submitting";

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4">
      <div className="w-full max-w-md space-y-6 text-white">
        <h1 className="text-3xl font-bold">Forgot password</h1>
        <p className="text-sm text-slate-400">
          Enter the email associated with your account and we&apos;ll send you a
          link to reset your password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {message && (
            <div
              className={`rounded-md border p-3 text-sm ${
                status === "success"
                  ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-200"
                  : "border-red-500/40 bg-red-500/10 text-red-200"
              }`}
            >
              {message}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email address
            </label>
            <input
              id="email"
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md bg-slate-900 px-4 py-2 text-white placeholder-slate-500 border border-slate-700 focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-cyan-600 py-2 text-sm font-semibold text-white hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? "Sending link..." : "Send reset link"}
          </button>
        </form>

        <p className="text-xs text-slate-500">
          If you created your account with Google or Facebook, please use the
          social login options on the sign in page instead of resetting your
          password here.
        </p>
      </div>
    </div>
  );
}
