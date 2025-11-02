// src/app/api/payment-webhook/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const event = await req.json();

    console.log("Webhook received:", event.type);

    // ✅ Only handle successful payments
    if (event.type === "payment.paid") {
      const payment = event.data.attributes;
      const billing = payment.billing || {};
      const email = billing.email || process.env.NOTIFY_RECEIVER;
      const name = billing.name || "CodeMaster User";
      const amount = payment.amount / 100; // PayMongo amounts are in cents
      const description = "CodeMaster Pro Plan";

      // 📨 Configure nodemailer
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      // ✉️ Send email receipt
      await transporter.sendMail({
        from: `"CodeMaster" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Payment Confirmation - CodeMaster Pro Plan",
        html: `
          <h2>Payment Successful 🎉</h2>
          <p>Hi ${name},</p>
          <p>Your payment of <strong>₱${amount}</strong> for <strong>${description}</strong> was received successfully.</p>
          <p>Thank you for supporting CodeMaster!</p>
        `,
      });

      console.log("✅ Email sent to:", email);

      return NextResponse.json({ success: true });
    }

    // For other event types, just respond OK
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("❌ Webhook error:", error);
    return NextResponse.json({ error: "Webhook failed" }, { status: 500 });
  }
}
