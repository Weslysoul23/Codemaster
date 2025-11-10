// File: /app/api/send-receipt/route.ts
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, amount, description, date } = body;

    // Validate required fields
    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }
    if (!name || typeof name !== "string") {
      return NextResponse.json({ error: "Valid name is required" }, { status: 400 });
    }
    if (!amount || typeof amount !== "number") {
      return NextResponse.json({ error: "Valid amount is required" }, { status: 400 });
    }
    if (!description || typeof description !== "string") {
      return NextResponse.json({ error: "Valid description is required" }, { status: 400 });
    }
    if (!date || typeof date !== "string") {
      return NextResponse.json({ error: "Valid date is required" }, { status: 400 });
    }

    // Ensure email credentials exist
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.warn("⚠️ Email credentials missing in environment variables");
      return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send email
    const mailOptions = {
      from: `"CodeMaster" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your CodeMaster Payment Receipt",
      html: `
        <div style="font-family:Arial, sans-serif; background:#0a1b55; color:white; padding:20px; border-radius:10px;">
          <h2>💻 CodeMaster Payment Receipt</h2>
          <p>Hi <b>${name}</b>,</p>
          <p>Thank you for subscribing to the <b>${description}</b> plan.</p>
          <p><b>Amount Paid:</b> ₱${amount.toFixed(2)}</p>
          <p><b>Date:</b> ${date}</p>
          <hr/>
          <p style="font-size:12px;">If you did not make this payment, please contact support immediately.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`📧 Receipt sent to ${email}`);

    return NextResponse.json({ success: true, message: "Email sent successfully" });

  } catch (error: any) {
    console.error("❌ Error sending receipt:", error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
