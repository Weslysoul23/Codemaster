// /api/paymongo-webhook.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Optional: if you're using Firebase Admin SDK
import { initializeApp, getApps } from "firebase-admin/app";
import { getDatabase } from "firebase-admin/database";

if (!getApps().length) {
  initializeApp({
    credential: require("firebase-admin").credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
    databaseURL: process.env.FIREBASE_DB_URL,
  });
}

export async function POST(req: Request) {
  try {
    const event = await req.json();

    // ✅ Only handle successful payments
    if (event.type !== "payment.paid" && event.type !== "link.payment.paid") {
      return NextResponse.json({ message: "Ignored non-paid event" });
    }

    const payment = event.data.attributes;
    const payerEmail =
      payment.billing?.email || payment.payment_method_details?.email;
    const payerName = payment.billing?.name || "Valued Customer";
    const amount = payment.amount / 100;
    const description = payment.description || "CodeMaster Pro Access";
    const date = new Date(payment.created_at * 1000).toLocaleString();

    // ✅ Extract userId from your success_url query param
    const successUrl = payment.description_url || payment.metadata?.success_url;
    let userId = null;
    if (successUrl && successUrl.includes("user=")) {
      const url = new URL(successUrl);
      userId = url.searchParams.get("user");
    }

    // ✅ Log for debugging
    console.log("🔔 Payment Confirmed:", { amount, description, userId, payerEmail });

    // 1️⃣ Update Firebase (only if we have a userId)
    if (userId) {
      const db = getDatabase();
      await db.ref(`purchases/${userId}`).push({
        item: description,
        amount,
        paid: true,
        timestamp: Date.now(),
      });
      console.log("✅ Purchase saved to Firebase for:", userId);
    }

    // 2️⃣ Send receipt email
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
          <p>Thank you for your purchase of <b>${description}</b>.</p>
          <p><b>Amount:</b> ₱${amount}</p>
          <p><b>Date:</b> ${date}</p>
          <hr/>
          <p style="font-size:12px;">If you did not make this payment, please contact support immediately.</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("📧 Email sent:", info.response);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("❌ Webhook error:", err);
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}
