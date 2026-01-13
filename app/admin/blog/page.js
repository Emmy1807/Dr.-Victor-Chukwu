import { prisma } from "../../../lib/prisma";
import { requireAdmin } from "../../../lib/requireAdmin";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
  await requireAdmin();

  const posts = await prisma.post.findMany({
    orderBy: { publishedAt: "desc" },
  });

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 text-white">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Blog posts</h1>
          <p className="mt-1 text-sm text-slate-400">
            Manage published and draft posts for the website.
          </p>
        </div>
        <Link
          href="/admin/blog/new"
          className="inline-flex items-center rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-black hover:bg-cyan-400"
        >
          New post
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/60">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-900/80 text-xs uppercase tracking-wide text-slate-400">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Published</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-t border-slate-800/60 hover:bg-slate-900/60">
                <td className="px-4 py-2 text-sm font-medium text-slate-50">{post.title}</td>
                <td className="px-4 py-2 text-xs text-slate-400">{post.slug}</td>
                <td className="px-4 py-2 text-xs">
                  {post.published ? (
                    <span className="inline-flex rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
                      Published
                    </span>
                  ) : (
                    <span className="inline-flex rounded-full bg-slate-500/10 px-2 py-0.5 text-[10px] font-semibold text-slate-300">
                      Draft
                    </span>
                  )}
                </td>
                <td className="px-4 py-2 text-xs text-slate-400">
                  {post.publishedAt && new Date(post.publishedAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 text-right text-xs">
                  <Link
                    href={`/admin/blog/${post.id}/edit`}
                    className="text-cyan-400 hover:text-cyan-300"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td className="px-4 py-6 text-center text-sm text-slate-400" colSpan={5}>
                  No posts yet. Click "New post" to create your first article.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
