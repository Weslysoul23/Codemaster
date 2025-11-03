import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, amount, description, date } = await req.json();

    // Create a transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // codemaster.notify@gmail.com
        pass: process.env.EMAIL_PASS, // app password
      },
    });

    // Generate a random transaction ID
    const transactionId = Math.floor(100000 + Math.random() * 900000);

    // Compose the email
    const mailOptions = {
  from: `"CodeMaster" <${process.env.EMAIL_USER}>`,
  to: email,
  bcc: process.env.NOTIFY_RECEIVER, // 👈 This sends a copy to you
  subject: `Your receipt from CodeMaster — #${transactionId}`,
  html: `
    <div style="font-family:Arial,sans-serif;padding:20px;background-color:#f8f9fa;border-radius:10px;">
      <h2 style="color:#00b894;">CodeMaster</h2>
      <p>Hi <strong>${name}</strong>,</p>
      <p>Thank you for your payment to <strong>CodeMaster</strong>!</p>
      <p>Here are your transaction details:</p>
      <ul>
        <li><strong>Receipt ID:</strong> #${transactionId}</li>
        <li><strong>Description:</strong> ${description}</li>
        <li><strong>Amount:</strong> ₱${amount}</li>
        <li><strong>Date:</strong> ${date}</li>
      </ul>
      <p>We appreciate your support. You can now enjoy your CodeMaster Pro Plan!</p>
      <hr style="margin:20px 0;border:none;border-top:1px solid #ccc;" />
      <p style="font-size:12px;color:#555;">This is an automated receipt. Please don’t reply to this email.</p>
    </div>
  `,
};


    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Email sending failed:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
