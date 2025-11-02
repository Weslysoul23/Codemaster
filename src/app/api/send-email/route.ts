import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Force Node.js runtime for nodemailer (not supported on the Edge runtime)
export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { name, email, amount, description, date } = await req.json();

    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS;
    const fallbackTo = process.env.NOTIFY_RECEIVER;

    if (!user || !pass) {
      console.error("Email environment variables are missing (EMAIL_USER or EMAIL_PASS).");
      return NextResponse.json(
        { success: false, error: "Email service not configured on the server." },
        { status: 500 }
      );
    }

    const to = email || fallbackTo;
    if (!to) {
      return NextResponse.json(
        { success: false, error: "No recipient email provided." },
        { status: 400 }
      );
    }

    // Use explicit Gmail SMTP settings for better reliability
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for 587
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: `CodeMaster <${user}>`,
      to,
      subject: "Payment Confirmation - CodeMaster Pro Plan",
      html: `
        <h2>Payment Successful 🎉</h2>
        <p>Hi ${name || "CodeMaster User"},</p>
        <p>Your <strong>${description || "CodeMaster Pro Plan"}</strong> payment of <strong>$${amount}</strong> was received on ${date}.</p>
        <p>Thank you for supporting CodeMaster!</p>
      `,
    });

    console.log("✅ Email sent successfully to:", to);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("❌ Email send error:", error?.message || error);
    return NextResponse.json(
      { success: false, error: "Failed to send email." },
      { status: 500 }
    );
  }
}
