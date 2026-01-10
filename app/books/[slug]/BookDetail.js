"use client";

import { useState } from "react";

export default function BookDetail({ book }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    if (!name || !email) {
      setMessage("Please enter your name and a valid email address.");
      return;
    }
    try {
      setStatus("submitting");
      setMessage("");
      const response = await fetch("/api/free-sample", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          book: book.slug,
        }),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || "Something went wrong. Please try again.");
      }
      setStatus("success");
      setMessage("Thank you. Please check your email for the free chapter.");
      setEmail("");
      setName("");
      setIsModalOpen(false);
    } catch (error) {
      setStatus("error");
      setMessage(error.message || "Unable to submit right now. Please try again.");
    }
  }
  const disableForm = status === "submitting";

  return (
    <div className="mx-auto max-w-5xl space-y-12 px-4 py-12">
      <section className="grid items-start gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <div className="space-y-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
            Book
          </p>
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
            {book.title}
          </h1>
          {book.subtitle && (
            <p className="text-sm text-slate-300 md:text-base">{book.subtitle}</p>
          )}
          <p className="text-sm text-slate-300">{book.description}</p>
          <div className="flex flex-wrap gap-3 text-xs">
            {book.buyLinks?.map((link) => (
              <a
                key={link.url}
                href={link.url}
                className="inline-flex items-center justify-center rounded-full bg-amber-400 px-4 py-2 font-medium text-slate-950 hover:bg-amber-300"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <div className="relative h-[420px] overflow-hidden rounded-3xl border-slate-800 md:h-[520px]">
          {book.cover ? (
            <img
              src={book.cover}
              alt={`${book.title} book cover`}
              className="absolute inset-0 h-full w-full object-contain"
            />
          ) : (
            <div
              className={`absolute inset-0 h-full w-60 bg-gradient-to-br ${book.coverColor || "from-slate-700 via-slate-900 to-slate-950"
                }`}
            />
          )}
        </div>
      </section>

      <section className="grid gap-10 md:grid-cols-2">
        <div className="space-y-6">
          <h2 className="text-lg font-semibold">About the book</h2>
          <p className="text-sm text-slate-300">
            {book.longDescription ||
              "This section is reserved for a fuller description of the book, its background, and what makes it distinct in your ministry and teaching."}
          </p>
          {book.audience?.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-slate-100">
                Who this book is for
              </h3>
              <ul className="space-y-1 text-sm text-slate-300">
                {book.audience.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {book.learn?.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-slate-100">
                What you will learn
              </h3>
              <ul className="space-y-1 text-sm text-slate-300">
                {book.learn.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div
          id="free-sample"
          className="group relative mt-12 overflow-hidden rounded-3xl border border-amber-500/25 bg-gradient-to-br from-slate-900/70 via-slate-950 to-black p-6 shadow-[0_18px_45px_rgba(0,0,0,0.85)] transform transition-all duration-500 hover:-translate-y-1 hover:border-amber-400/60 hover:shadow-[0_24px_70px_rgba(0,0,0,0.95)] md:mt-24"
        >
          <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-tr from-amber-400/12 via-transparent to-cyan-400/12 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

          <div className="relative z-10">
            <h2 className="text-lg font-semibold md:text-xl">Read the first chapter free</h2>
            <p className="mt-2 text-xs text-slate-300 md:text-[13px]">
              Enter your name and email to receive a free sample chapter of this
              book by email.
            </p>
            <button
              type="button"
              onClick={() => {
                setIsModalOpen(true);
                setStatus("idle");
                setMessage("");
              }}
              className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-amber-400 px-4 py-2 text-xs font-semibold text-slate-950 transition hover:bg-amber-300 md:w-auto md:px-6"
            >
              Read free sample
            </button>
            {status === "success" && message && (
              <p className="mt-3 text-xs text-emerald-300">{message}</p>
            )}
            {status === "error" && message && (
              <p className="mt-3 text-xs text-red-400">{message}</p>
            )}
          </div>
        </div>
      </section>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-950 p-6 text-xs text-slate-200">
            <h2 className="text-base font-semibold text-slate-50">
              Read the first chapter free
            </h2>
            <p className="mt-2 text-[11px] text-slate-300">
              Share your details and we&apos;ll email you a free sample chapter of
              this book.
            </p>
            <form onSubmit={handleSubmit} className="mt-4 space-y-3">
              <div className="space-y-1">
                <label htmlFor="sample-name" className="block text-slate-200">
                  Full name
                </label>
                <input
                  id="sample-name"
                  type="text"
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-slate-50 outline-none ring-0 focus:border-amber-400"
                  placeholder="Your name"
                  disabled={disableForm}
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="sample-email" className="block text-slate-200">
                  Email address
                </label>
                <input
                  id="sample-email"
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-slate-50 outline-none ring-0 focus:border-amber-400"
                  placeholder="you@example.com"
                  disabled={disableForm}
                />
              </div>
              <div className="mt-2 flex gap-2">
                <button
                  type="submit"
                  disabled={disableForm}
                  className="inline-flex flex-1 items-center justify-center rounded-full bg-amber-400 px-4 py-2 text-xs font-medium text-slate-950 hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status === "submitting"
                    ? "Sending..."
                    : "Send me the free chapter"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    if (status === "idle") {
                      setName("");
                      setEmail("");
                      setMessage("");
                    }
                  }}
                  className="inline-flex items-center justify-center rounded-full border border-slate-600 px-4 py-2 text-xs font-medium text-slate-200 hover:border-amber-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
