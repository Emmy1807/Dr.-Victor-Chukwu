"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewPostPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    cover: "",
    category: "",
    readingTime: "",
    content: "",
    published: false,
  });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const isSubmitting = status === "submitting";

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    try {
      const res = await fetch("/api/admin/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setError(data?.error || "Unable to create post.");
        return;
      }

      setStatus("success");
      router.push("/admin/blog");
    } catch (err) {
      console.error(err);
      setStatus("error");
      setError("An unexpected error occurred.");
    } finally {
      setStatus("idle");
    }
  }

  function updateField(field) {
    return (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 text-white">
      <h1 className="text-2xl font-semibold">New blog post</h1>
      <p className="mt-1 text-sm text-slate-400">
        Draft and publish a new article for the blog.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        {error && (
          <div className="rounded-md border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-200">
            {error}
          </div>
        )}

        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-200">Title</label>
          <input
            type="text"
            required
            value={form.title}
            onChange={updateField("title")}
            className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none focus:border-cyan-400"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-200">Slug</label>
          <input
            type="text"
            required
            value={form.slug}
            onChange={updateField("slug")}
            placeholder="sowing-and-reaping"
            className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none focus:border-cyan-400"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-200">Category</label>
            <input
              type="text"
              value={form.category}
              onChange={updateField("category")}
              placeholder="Teaching, Devotional, Testimony..."
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none focus:border-cyan-400"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-200">Reading time</label>
            <input
              type="text"
              value={form.readingTime}
              onChange={updateField("readingTime")}
              placeholder="4 min read"
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none focus:border-cyan-400"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-200">Cover image URL</label>
          <input
            type="text"
            value={form.cover}
            onChange={updateField("cover")}
            placeholder="/images/blog/your-image.jpg"
            className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none focus:border-cyan-400"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-200">Excerpt</label>
          <textarea
            rows={3}
            value={form.excerpt}
            onChange={updateField("excerpt")}
            className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none focus:border-cyan-400"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-200">Content (HTML or Markdown rendered to HTML)</label>
          <textarea
            rows={14}
            required
            value={form.content}
            onChange={updateField("content")}
            className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm font-mono outline-none focus:border-cyan-400"
          />
        </div>

        <label className="flex items-center gap-2 text-xs text-slate-300">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, published: e.target.checked }))
            }
            className="h-3 w-3 rounded border-slate-600 bg-slate-950 text-cyan-400"
          />
          Mark as published
        </label>

        <div className="mt-4 flex gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center rounded-full bg-cyan-500 px-5 py-2 text-xs font-semibold text-black hover:bg-cyan-400 disabled:opacity-60"
          >
            {isSubmitting ? "Saving..." : "Create post"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin/blog")}
            className="inline-flex items-center rounded-full border border-slate-600 px-5 py-2 text-xs font-semibold text-slate-200 hover:border-cyan-400"
          >
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
}
