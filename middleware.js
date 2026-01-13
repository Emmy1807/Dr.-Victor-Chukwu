import { NextResponse } from "next/server";

// Global middleware to temporarily disable the public blog and admin blog pages
export function middleware(request) {
  const { pathname } = request.nextUrl;

  // This will only run for paths matched in the config.matcher below,
  // so the check is mostly informational.
  if (pathname.startsWith("/blog") || pathname.startsWith("/admin/blog")) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Only run this middleware for the blog and admin blog routes
export const config = {
  matcher: ["/blog/:path*", "/admin/blog/:path*"],
};
