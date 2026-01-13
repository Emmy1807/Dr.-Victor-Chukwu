export const dynamic = "force-dynamic";

// This route is temporarily disabled while the blog/admin UI is turned off.
// It always returns 404 so that Vercel can build without pulling in
// Prisma/NextAuth for this unused endpoint.

export async function GET() {
  return new Response(
    JSON.stringify({ error: "Admin post detail route is disabled." }),
    {
      status: 404,
      headers: { "Content-Type": "application/json" },
    }
  );
}

export async function PATCH() {
  return new Response(
    JSON.stringify({ error: "Admin post detail route is disabled." }),
    {
      status: 404,
      headers: { "Content-Type": "application/json" },
    }
  );
}

export async function DELETE() {
  return new Response(
    JSON.stringify({ error: "Admin post detail route is disabled." }),
    {
      status: 404,
      headers: { "Content-Type": "application/json" },
    }
  );
}
