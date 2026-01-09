"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const { data: session } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (!result.ok) {
        setError(result.error || "Invalid email or password");
        return;
      }

      router.push("/");
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black px-4">
        <div className="w-full max-w-md space-y-6 text-white">
          <h1 className="text-3xl font-bold">Welcome!</h1>
          <div className="rounded-md bg-slate-900 p-4">
            <p className="text-sm text-slate-400">Logged in as:</p>
            <p className="mt-2 text-lg font-semibold">{session.user?.name}</p>
            <p className="text-sm text-slate-400">{session.user?.email}</p>
          </div>

          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full rounded-md bg-red-600 py-3 text-sm font-semibold text-white hover:bg-red-700 transition"
          >
            Log Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4">
      <div className="w-full max-w-md space-y-6 text-white">
        <h1 className="text-3xl font-bold">Log In</h1>
        <p className="text-sm text-slate-400">
          New here?{" "}
          <a href="/auth/sign-up" className="text-cyan-400 hover:underline">
            Create an account
          </a>
        </p>

        {/* Email Sign In Form */}
        <form onSubmit={handleEmailSignIn} className="space-y-4">
          {error && (
            <div className="rounded-md bg-red-500/10 p-3 text-sm text-red-400 border border-red-500/20">
              {error}
            </div>
          )}

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
              Password
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
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

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
          <img src="/icons/google.svg" alt="" className="h-5" />
          <span>Log in with Google</span>
        </button>

        <button
          onClick={() => signIn("facebook")}
          className="flex w-full items-center justify-center gap-3 rounded-md bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
        >
          <img src="/icons/facebook.svg" alt="" className="h-5" />
          <span>Log in with Facebook</span>
        </button>
      </div>
    </div>
  );
}
