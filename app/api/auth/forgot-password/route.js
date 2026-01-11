export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

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

// POST /api/auth/forgot-password
// Body: { email: string }
export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const prismaClient = getPrisma();

    const user = await prismaClient.user.findUnique({ where: { email } });

    // To avoid leaking whether an email exists, always return success
    if (!user) {
      return NextResponse.json({ success: true });
    }

    // If this is an OAuth-only account (no password), surface a specific error
    if (!user.password) {
      return NextResponse.json(
        {
          error:
            "This account uses Google or Facebook sign in. Please use the social login option instead.",
        },
        { status: 400 }
      );
    }

    // Create a password reset token using VerificationToken table
    const token = crypto.randomUUID();
    const expires = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

    await prismaClient.verificationToken.create({
      data: {
        identifier: email,
        token,
        expires,
      },
    });

    const resetUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/auth/reset-password?token=${encodeURIComponent(
      token
    )}`;

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: Number(process.env.EMAIL_SERVER_PORT),
      secure: process.env.EMAIL_SERVER_PORT === "465",
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Reset your password",
      html: `
        <div style="font-family:Arial, sans-serif; max-width:600px; margin:auto;">
          <h2>Reset your password</h2>
          <p>You requested to reset your password for your account on Dr. Victor Chukwu's website.</p>
          <p>Click the button below to choose a new password. This link will expire in 1 hour.</p>
          <p style="margin:24px 0;">
            <a href="${resetUrl}" style="display:inline-block;padding:12px 20px;background:#06b6d4;color:#000;border-radius:999px;text-decoration:none;font-weight:bold;">
              Reset password
            </a>
          </p>
          <p>If you did not request this, you can safely ignore this email.</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { error: "Unable to process request" },
      { status: 500 }
    );
  }
}
