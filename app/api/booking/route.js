export const dynamic = "force-dynamic";

import nodemailer from "nodemailer";

export async function POST(request) {
    try {
        const body = await request.json();
        const { name, email, type, message } = body;

        // Validate required fields
        if (!name || !email || !type || !message) {
            return Response.json(
                { error: "All fields are required" },
                { status: 400 }
            );
        }

        // Create transporter with Gmail SMTP
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_SERVER_HOST,
            port: parseInt(process.env.EMAIL_SERVER_PORT),
            secure: true,
            auth: {
                user: process.env.EMAIL_SERVER_USER,
                pass: process.env.EMAIL_SERVER_PASSWORD,
            },
        });

        // Email to admin
        const adminMailOptions = {
            from: process.env.EMAIL_FROM,
            to: process.env.ADMIN_EMAIL,
            subject: `New Booking Inquiry: ${type}`,
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Booking Inquiry</h2>
          
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Booking Type:</strong> ${type}</p>
            <p><strong>Message:</strong></p>
            <p style="background-color: #fff; padding: 10px; border-left: 3px solid #fbbf24;">${message.replace(/\n/g, "<br>")}</p>
          </div>

          <p style="color: #666; font-size: 12px; margin-top: 30px;">
            This inquiry was submitted via the booking form on Dr. Victor Chukwu's website.
          </p>
        </div>
      `,
        };

        // Email to user
        const userMailOptions = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: "Booking Inquiry Received",
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Thank You!</h2>
          
          <p style="line-height: 1.6; color: #555;">
            Hi ${name},
          </p>
          
          <p style="line-height: 1.6; color: #555;">
            Thank you for your inquiry regarding a ${type}. We have received your message and will review it shortly.
          </p>

          <p style="line-height: 1.6; color: #555;">
            Dr. Victor Chukwu or his team will get back to you within 2-3 business days with a response.
          </p>

          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #666;"><strong>Your Inquiry Details:</strong></p>
            <p style="margin: 10px 0 0 0; color: #666;"><strong>Type:</strong> ${type}</p>
            <p style="margin: 5px 0 0 0; color: #666;"><strong>Message:</strong></p>
            <p style="margin: 5px 0 0 0; color: #666; background-color: #fff; padding: 10px; border-left: 3px solid #fbbf24;">${message.replace(/\n/g, "<br>")}</p>
          </div>

          <p style="line-height: 1.6; color: #555;">
            In the meantime, feel free to reach out directly if you have any urgent questions.
          </p>

          <p style="line-height: 1.6; color: #555;">
            Blessings,<br>
            Dr. Victor Chukwu's Team
          </p>

          <p style="color: #999; font-size: 12px; margin-top: 30px; border-top: 1px solid #ddd; padding-top: 15px;">
            This is an automated response. Please do not reply to this email.
          </p>
        </div>
      `,
        };

        // Send emails
        await transporter.sendMail(adminMailOptions);
        await transporter.sendMail(userMailOptions);

        return Response.json(
            { success: true, message: "Booking inquiry submitted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Booking email error:", error);
        return Response.json(
            { error: "Failed to submit booking inquiry. Please try again." },
            { status: 500 }
        );
    }
}
