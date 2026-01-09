import Link from "next/link";
import { books } from "../../content/books";

export const metadata = {
  title: "Books | Dr. Victor Chukwu",
};

export default function BooksPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 space-y-12">
      {/* Header */}
      <header className="space-y-4 text-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-400 mb-2">
            Books
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Spiritual Resources & Teachings
          </h1>
          <p className="max-w-3xl mx-auto text-base text-slate-300">
            A growing library of books focused on the will of God, purpose, relationships, and practical Christian living. Explore each title and request a free sample chapter.
          </p>
        </div>
      </header>

      {/* Books Grid with 3D Effects */}
      <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {books.map((book) => (
          <article
            key={book.slug}
            className="group relative h-full"
          >
            {/* Animated background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-cyan-400/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Card container with 3D perspective */}
            <div className="relative h-full rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-900/80 to-slate-950/80 backdrop-blur p-6 hover:border-slate-600 transition-all duration-300 flex flex-col hover:shadow-2xl hover:shadow-amber-400/10">

              {/* Book Cover with 3D Flip Effect */}
              <div className="relative mb-6 h-72 w-full rounded-xl overflow-hidden bg-slate-800">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-600 to-slate-800 opacity-30 z-10" />

                {book.cover ? (
                  <img
                    src={book.cover}
                    alt={`${book.title} book cover`}
                    className="h-95% w-full object-fill transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div
                    className={`h-full w-full bg-gradient-to-br ${book.coverColor || "from-slate-700 via-slate-800 to-slate-900"}`}
                  />
                )}

                {/* Overlay shine effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Content */}
              <div className="flex-1 space-y-2 mb-4">
                <div>
                  <h2 className="text-lg font-bold text-white mb-1 group-hover:text-amber-400 transition-colors">
                    {book.title}
                  </h2>
                  {book.subtitle && (
                    <p className="text-xs text-slate-400 italic">{book.subtitle}</p>
                  )}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {book.description}
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3 pt-4 border-t border-slate-700/50">
                <Link
                  href={`/books/${book.slug}`}
                  className="block w-full text-center rounded-lg bg-gradient-to-r from-amber-400 to-amber-500 px-4 py-3 font-semibold text-slate-950 hover:from-amber-300 hover:to-amber-400 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-amber-400/50"
                >
                  Explore Details
                </Link>
                <Link
                  href={`/books/${book.slug}#free-sample`}
                  className="block w-full text-center rounded-lg border-2 border-slate-600 px-4 py-2 font-semibold text-slate-100 hover:border-cyan-400 hover:bg-cyan-400/10 transition-all duration-300"
                >
                  Free Sample
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
