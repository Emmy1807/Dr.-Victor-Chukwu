"use client";

import Link from "next/link";
import { useState } from "react";

const primaryNav = [
  { href: "/about", label: "About Me" },
  { href: "/books", label: "Books" },
  { href: "/media", label: "Talks & Songs" },
  { href: "/programs", label: "Programs" },
  { href: "/blog", label: "Blog" },
];

const secondaryNav = [
  { href: "/booking", label: "Book Dr. Chukwu" },
  { href: "/auth/sign-in", label: "Log In" },
];

export default function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-slate-800 bg-black/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="leading-tight">
            <span className="block text-[11px] font-semibold tracking-[0.35em] text-cyan-400">
              /Dr. Victor
            </span>
            <span className="block text-lg font-semibold text-cyan-300">
              Chukwu
            </span>
          </Link>
          <p className="hidden text-[11px] text-cyan-400 md:block">
            Pastor, Author, Advisor & Musician
          </p>
        </div>
        <nav className="hidden items-center gap-6 text-sm text-cyan-300 lg:flex">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-cyan-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-4 lg:flex">
          <Link
            href="/auth/sign-in"
            className="flex items-center gap-2 text-sm text-cyan-300 hover:text-cyan-100"
          >
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-cyan-400 text-[10px] text-cyan-200">

            </span>
            <span>Log In</span>
          </Link>
          <Link
            href="/booking"
            className="rounded-md border border-cyan-400 px-4 py-1.5 text-sm font-semibold text-cyan-100 hover:bg-cyan-500/10"
          >
            Book Dr. Chukwu
          </Link>
        </div>
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="inline-flex items-center justify-center rounded-full border border-cyan-500 px-3 py-1 text-xs text-cyan-200 hover:bg-cyan-500/10 lg:hidden"
        >
          Menu
        </button>
      </div>
      {open && (
        <div className="border-t border-slate-800 bg-black lg:hidden">
          <nav className="mx-auto flex max-w-5xl flex-col px-4 py-3 text-sm text-cyan-100">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="py-1.5 hover:text-white"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 border-t border-slate-800 pt-2">
              {secondaryNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="py-1.5 hover:text-white"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
