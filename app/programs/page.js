import Link from "next/link";
import { programs } from "../../content/programs";

export const metadata = {
  title: "Programs | Dr. Victor Chukwu",
};

export default function ProgramsPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-12">
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
          Programs
        </p>
        <h1 className="text-2xl font-semibold md:text-3xl">
          Mentorship &amp; Counselling Programs
        </h1>
      </header>

      {programs.map((program) => (
        <article
          key={program.slug}
          className="grid overflow-hidden rounded-xl border border-slate-800 bg-black md:grid-cols-[2fr_3fr]"
        >
          <div className="h-60 md:h-full">
            {program.cover && (
              <img
                src={program.cover}
                alt={program.title}
                className="h-full w-full object-cover"
              />
            )}
          </div>

          <div className="flex flex-col justify-center space-y-4 p-8 text-white">
            <h2 className="text-xl font-semibold">{program.title}</h2>

            {program.duration && (
              <p className="text-sm text-slate-300">{program.duration}</p>
            )}

            <p className="text-lg font-semibold">{program.priceLabel}</p>

            <p className="text-sm text-slate-300">{program.description}</p>

            <div className="flex gap-3 pt-2">
              <Link
                href={`/programs/${program.slug}`}
                className="inline-flex w-fit rounded-md bg-cyan-400 px-6 py-2 text-sm font-semibold text-black hover:bg-cyan-300"
              >
                {program.cta || "View Details"}
              </Link>

              {program.slug === "mentorship-program" && (
                <a
                  href="https://peacementorship.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-fit rounded-md border border-cyan-400 px-6 py-2 text-sm font-semibold text-cyan-400 hover:bg-cyan-400/10"
                >
                  Learn More
                </a>
              )}

              {program.slug === "pre-marital-counselling" && (
                <a
                  href="https://www.peacemarriage.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-fit rounded-md border border-cyan-400 px-6 py-2 text-sm font-semibold text-cyan-400 hover:bg-cyan-400/10"
                >
                  Learn More
                </a>
              )}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
