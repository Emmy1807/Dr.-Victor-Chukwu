export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/route";
import { prisma } from "../../../../../lib/prisma";

async function requireAdminSession() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return { user: null, error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });

  if (!user || user.role !== "ADMIN") {
    return { user: null, error: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
  }

  return { user, error: null };
}

export async function PATCH(req, { params }) {
  try {
    const { user, error } = await requireAdminSession();
    if (error) return error;

    const id = Number(params.id);
    if (Number.isNaN(id)) {
      return NextResponse.json({ error: "Invalid post id" }, { status: 400 });
    }

    const data = await req.json();

    const post = await prisma.post.update({
      where: { id },
      data,
    });

    return NextResponse.json(post);
  } catch (err) {
    console.error("Update post error:", err);
    return NextResponse.json(
      { error: "Unable to update post" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const { user, error } = await requireAdminSession();
    if (error) return error;

    const id = Number(params.id);
    if (Number.isNaN(id)) {
      return NextResponse.json({ error: "Invalid post id" }, { status: 400 });
    }

    await prisma.post.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Delete post error:", err);
    return NextResponse.json(
      { error: "Unable to delete post" },
      { status: 500 }
    );
  }
}
