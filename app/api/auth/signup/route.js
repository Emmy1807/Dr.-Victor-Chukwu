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

export async function POST(req) {
    try {
        const { email, password, name } = await req.json();

        // Validation
        if (!email || !password || !name) {
            return NextResponse.json(
                { error: "Missing required fields" },
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

        // Check if user exists
        const existingUser = await prismaClient.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: "User already exists" },
                { status: 409 }
            );
        }

        // Hash password
        const hashedPassword = await bcryptjs.hash(password, 10);

        // Create user
        const user = await prismaClient.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
            },
        });
        // Return response (never return password)
        return NextResponse.json({
            success: true,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            },
        });
    } catch (error) {
        console.error("Signup error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
