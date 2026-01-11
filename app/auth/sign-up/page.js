"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Sign up failed");
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/auth/sign-in");
      }, 2000);
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4">
      <div className="w-full max-w-md space-y-6 text-white">
        <h1 className="text-3xl font-bold">Sign Up</h1>
        <p className="text-sm text-slate-400">
          Already a member?{" "}
          <a href="/auth/sign-in" className="text-cyan-400 hover:underline">
            Log in
          </a>
        </p>

        {/* Email Sign Up Form */}
        {!success && (
          <form onSubmit={handleEmailSignUp} className="space-y-4">
            {error && (
              <div className="rounded-md bg-red-500/10 p-3 text-sm text-red-400 border border-red-500/20">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Full Name (optional)
              </label>
              <input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-md bg-slate-900 px-4 py-2 text-white placeholder-slate-500 border border-slate-700 focus:border-cyan-400 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md bg-slate-900 px-4 py-2 text-white placeholder-slate-500 border border-slate-700 focus:border-cyan-400 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Password (min 6 characters)
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md bg-slate-900 px-4 py-2 text-white placeholder-slate-500 border border-slate-700 focus:border-cyan-400 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-cyan-600 py-2 text-sm font-semibold text-white hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>
        )}

        {success && (
          <div className="rounded-md bg-green-500/10 p-4 text-sm text-green-400 border border-green-500/20">
            <p className="font-semibold mb-1">Account created successfully!</p>
            <p>Redirecting to sign in page...</p>
          </div>
        )}

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-black px-2 text-slate-400">Or continue with</span>
          </div>
        </div>

        <button
          onClick={() => signIn("google")}
          className="flex w-full items-center justify-center gap-3 rounded-md bg-white py-3 text-sm font-semibold text-black hover:bg-slate-100 transition-colors"
        >
          <img src="/icons/google.svg" alt="Google logo" className="h-5" />
          <span>Sign up with Google</span>
        </button>
      </div>
    </div>
  );
}
