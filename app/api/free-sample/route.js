export const dynamic = "force-dynamic";

import nodemailer from "nodemailer";
import path from "path";
import fs from "fs";
import { books } from "../../../content/books";

export async function POST(request) {
  try {
    const { name, email, book } = await request.json();

    // Validate input
    if (!name || !email || !book) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Find book
    const selectedBook = books.find((b) => b.slug === book);
    if (!selectedBook || !selectedBook.freeSample?.file) {
      return new Response(
        JSON.stringify({ error: "Book or free sample not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // Resolve PDF path
    const filePath = path.join(
      process.cwd(),
      "private/free-samples",
      selectedBook.freeSample.file
    );

    if (!fs.existsSync(filePath)) {
      return new Response(
        JSON.stringify({ error: "Sample file unavailable" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // Mail transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: Number(process.env.EMAIL_SERVER_PORT),
      secure: process.env.EMAIL_SERVER_PORT === "465",
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    });

    const downloadLink = `${process.env.NEXT_PUBLIC_SITE_URL}/api/download?file=${selectedBook.freeSample.file}&token=${Buffer.from(email).toString("base64")}`;

    // Email to user
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: `Your free chapter – ${selectedBook.title}`,
      html: `
        <div style="font-family:Arial; max-width:600px; margin:auto">
          <h2>Hello ${name},</h2>

          <p>Thank you for requesting a free chapter of:</p>

          <h3>${selectedBook.title}</h3>
          <p>${selectedBook.description}</p>

          <a href="${downloadLink}"
            style="
              display:inline-block;
              padding:14px 24px;
              background:#f59e0b;
              color:#000;
              text-decoration:none;
              font-weight:bold;
              border-radius:24px;
              margin-top:16px
            ">
            Download Free Chapter
          </a>

          <p style="margin-top:32px">
            Stay blessed,<br />
            <strong>Dr. Victor Chukwu</strong>
          </p>
        </div>
      `,
    });

    // Admin notification
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.ADMIN_EMAIL,
      subject: "📘 New Free Book Sample Request",
      html: `
        <h3>New Free Sample Request</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Book:</strong> ${selectedBook.title}</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
      `,
    });

    console.log("Free sample email sent to", email);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Unable to process request" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
