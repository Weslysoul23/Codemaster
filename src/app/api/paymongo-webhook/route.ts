// /api/paymongo-webhook.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const event = await req.json();

    // 1️⃣ Make sure this is a successful payment
    if (event.type !== "payment.paid") {
      return NextResponse.json({ message: "Not a paid event" });
    }

    const payment = event.data.attributes;
    const payerEmail = payment.billing?.email || payment.payment_method_details?.email;
    const payerName = payment.billing?.name || "Valued Customer";
    const amount = payment.amount / 100; // convert cents to PHP
    const description = payment.description || "CodeMaster Plan";
    const date = new Date(payment.created_at * 1000).toLocaleString();

    if (!payerEmail) {
      console.error("No payer email in payment:", payment);
      return NextResponse.json({ error: "No payer email found" }, { status: 400 });
    }

    // 2️⃣ Send receipt
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"CodeMaster" <${process.env.EMAIL_USER}>`,
      to: payerEmail,
      subject: "Your CodeMaster Payment Receipt",
      html: `
        <div style="font-family:Arial, sans-serif; background:#0a1b55; color:white; padding:20px; border-radius:10px;">
          <h2>💻 CodeMaster Payment Receipt</h2>
          <p>Hi <b>${payerName}</b>,</p>
          <p>Thank you for subscribing to the <b>${description}</b>.</p>
          <p><b>Amount:</b> ₱${amount}</p>
          <p><b>Date:</b> ${date}</p>
          <hr/>
          <p style="font-size:12px;">If you did not make this payment, please contact support immediately.</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);

    return NextResponse.json({ success: true, message: "Receipt sent" });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}
