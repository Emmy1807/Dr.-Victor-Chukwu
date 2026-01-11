export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

let prisma = null;

function getPrisma() {
  if (!prisma) {
    const { PrismaClient } = require("@prisma/client");
    if (process.env.NODE_ENV === "production") {
      prisma = new PrismaClient();
    } else {
      if (!global.prisma) {
        global.prisma = new PrismaClient();
      }
      prisma = global.prisma;
    }
  }
  return prisma;
}

// POST /api/auth/reset-password
// Body: { token: string, password: string }
export async function POST(request) {
  try {
    const { token, password } = await request.json();

    if (!token || !password) {
      return NextResponse.json(
        { error: "Token and password are required" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    const prismaClient = getPrisma();

    // Look up the verification token using the unique token field
    const record = await prismaClient.verificationToken.findUnique({
      where: { token },
    });

    if (!record || record.expires < new Date()) {
      return NextResponse.json(
        { error: "Reset link is invalid or has expired" },
        { status: 400 }
      );
    }

    const user = await prismaClient.user.findUnique({
      where: { email: record.identifier },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    await prismaClient.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    await prismaClient.verificationToken.delete({
      where: { token: record.token },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      { error: "Unable to reset password" },
      { status: 500 }
    );
  }
}
