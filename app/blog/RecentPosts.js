"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { posts } from "../../content/blog";

export default function RecentPosts({ currentSlug }) {
  const recent = posts
    .filter((post) => post.slug !== currentSlug)
    .slice(0, 3);

  if (recent.length === 0) return null;

  return (
    <motion.section
      className="mt-20 border-t border-slate-800 pt-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight text-white">
          Recent Posts
        </h2>
        <Link
          href="/blog"
          className="text-sm font-medium text-amber-400 hover:text-amber-300"
        >
          See all →
        </Link>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {recent.map((post) => (
          <article key={post.slug} className="group space-y-4">
            {/* Image */}
            {post.cover && (
              <div className="aspect-[4/3] overflow-hidden rounded-xl">
                <img
                  src={post.cover}
                  alt={post.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
            )}

            {/* Meta */}
            <p className="text-xs uppercase tracking-wide text-slate-400">
              {post.category || "Teaching"}
            </p>

            {/* Title */}
            <h3 className="text-lg font-semibold leading-snug text-white group-hover:text-amber-400">
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h3>

            {/* Read more */}
            <Link
              href={`/blog/${post.slug}`}
              className="inline-block text-sm font-medium text-amber-400 hover:text-amber-300"
            >
              Read article →
            </Link>
          </article>
        ))}
      </div>
    </motion.section>
  );
}