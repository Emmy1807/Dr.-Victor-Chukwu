import Link from "next/link";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 space-y-16">
      <section className="grid items-center gap-10 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <div className="space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
            Pastor · Author · Advisor
          </p>
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
            Awakening purpose, building sound minds, and raising a Christ-centered
            generation.
          </h1>
          <p className="max-w-xl text-sm text-slate-300 md:text-base">
            His ministry is marked by wisdom,
            courageous faith, and a deep commitment to helping people discover and walk in their God-ordained purpose.
            A teacher-worshiper at heart, he expresses his calling
            through writing, teaching, mentoring, and music.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/books"
              className="rounded-full bg-amber-400 px-5 py-2 text-sm font-medium text-slate-950 hover:bg-amber-300"
            >
              Explore books
            </Link>
            {/* <Link
              href="/blog"
              className="rounded-full border border-slate-600 px-5 py-2 text-sm font-medium text-slate-100 hover:border-amber-400"
            >
              Read the blog
            </Link> */}
          </div>
        </div>
        <div className="rounded-3xl overflow-hidden">
          <img
            src="/images/mr.jpeg"
            alt="Dr. Victor Chukwu"
            className="w-full h-full object-cover rounded-3xl"
          />
        </div>
      </section>
    </div>
  );
}
