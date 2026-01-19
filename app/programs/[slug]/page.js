import Link from "next/link";
import { notFound } from "next/navigation";
import { programs } from "../../../content/programs";

export function generateStaticParams() {
  return programs.map((program) => ({ slug: program.slug }));
}

export default function ProgramDetailPage({ params }) {
  const program = programs.find((item) => item.slug === params.slug);

  if (!program) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-5xl space-y-10 px-4 py-12">
      <section className="grid gap-8 md:grid-cols-[3fr_2fr]">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
            Program
          </p>
          <h1 className="text-2xl font-semibold md:text-3xl">{program.title}</h1>
          {program.duration && (
            <p className="text-sm text-slate-300">{program.duration}</p>
          )}
          <p className="text-sm text-slate-300">{program.description}</p>
        </div>

        <div className="relative h-64 overflow-hidden rounded-2xl border border-slate-800 md:h-80">
          {program.cover && (
            <img
              src={program.cover}
              alt={program.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
        </div>
      </section>

      <section className="space-y-4">
        <p className="text-lg font-semibold">{program.priceLabel}</p>
        <Link
          href={program.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex rounded-full bg-cyan-400 px-6 py-2 text-sm font-semibold text-black hover:bg-cyan-300"
        >
          Apply for this program
        </Link>
      </section>
    </div>
  );
}
