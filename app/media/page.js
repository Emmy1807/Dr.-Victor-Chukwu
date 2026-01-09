export const metadata = {
  title: "Talks & Songs | Dr. Victor Chukwu",
};

export default function MediaPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 space-y-12">
      {/* Header */}
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">
          Media
        </p>
        <h1 className="text-2xl font-semibold md:text-3xl">Talks &amp; Songs</h1>
        <p className="max-w-2xl text-sm text-slate-300 md:text-base">
          Watch sermons, teachings, and worship songs shared to strengthen
          faith and encourage spiritual growth.
        </p>
      </header>

      {/* Two Placeholders */}
      <section className="grid gap-8 md:grid-cols-2">
        {/* Talks Placeholder */}
        <article className="group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40">
          <a
            href="https://youtube.com/@drvictorchukwu?si=h8W64pRidVrQC4jT"
            target="_blank"
            rel="noopener noreferrer"
            className="relative block aspect-video bg-slate-800 overflow-hidden"
          >
            <img
              src="/images/talks.jpeg"
              alt="Talks & Teachings"
              className="h-full w-full object-cover transition group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <span className="rounded-full bg-white/90 px-6 py-3 text-sm font-semibold text-slate-900">
                Watch Talks on YouTube
              </span>
            </div>
          </a>
          <div className="p-6">
            <h2 className="text-lg font-semibold">Talks by Dr. Victor Chukwu</h2>
            <p className="mt-2 text-sm text-slate-300">
              Sermons and teachings on God's will, purpose, and spiritual growth.
            </p>
          </div>
        </article>

        {/* Songs Placeholder */}
        <article className="group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40">
          <a
            href="https://youtube.com/@peace_music?si=pgA_KwSx9nGE4h8w"
            target="_blank"
            rel="noopener noreferrer"
            className="relative block aspect-video bg-slate-800 overflow-hidden"
          >
            <img
              src="/images/music2.jpeg"
              alt="Worship & Music"
              className="h-full w-full object-cover transition group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <span className="rounded-full bg-white/90 px-6 py-3 text-sm font-semibold text-slate-900">
                Listen to Music on YouTube
              </span>
            </div>
          </a>
          <div className="p-6">
            <h2 className="text-lg font-semibold">Music by Dr. Victor Chukwu</h2>
            <p className="mt-2 text-sm text-slate-300">
              Original worship songs and musical expressions of faith.
            </p>
          </div>
        </article>
      </section>
    </div>
  );
}
