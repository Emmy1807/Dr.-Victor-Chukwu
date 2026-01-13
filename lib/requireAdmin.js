import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/route";
import { prisma } from "./prisma";
import { redirect } from "next/navigation";

// Server-side guard to ensure the current user is an ADMIN.
// Use inside server components or route handlers:
//   const admin = await requireAdmin();
export async function requireAdmin() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/auth/sign-in");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user || user.role !== "ADMIN") {
    redirect("/");
  }

  return user;
}
