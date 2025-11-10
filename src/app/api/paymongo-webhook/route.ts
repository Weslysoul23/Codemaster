// File: /app/api/paymongo-webhook/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getDatabase } from "firebase-admin/database";

// ✅ Initialize Firebase Admin only once
if (!getApps().length) {
  if (
    !process.env.FIREBASE_PROJECT_ID ||
    !process.env.FIREBASE_CLIENT_EMAIL ||
    !process.env.FIREBASE_PRIVATE_KEY ||
    !process.env.FIREBASE_DB_URL
  ) {
    console.error("Firebase environment variables are missing!");
    throw new Error("Missing Firebase credentials");
  }

  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
    databaseURL: process.env.FIREBASE_DB_URL, // Realtime DB URL
  });

  console.log("✅ Firebase initialized");
}

const db = getDatabase();

// POST webhook handler
export async function POST(req: Request) {
  try {
    const event = await req.json();
    console.log("Webhook received:", JSON.stringify(event, null, 2));

    // Only handle paid events
    if (event.type !== "payment.paid" && event.type !== "link.payment.paid") {
      return NextResponse.json({ message: "Not a paid event" });
    }

    const payment = event.data?.attributes;
    if (!payment) {
      return NextResponse.json({ error: "Invalid webhook payload" }, { status: 400 });
    }

    const payerEmail = payment.billing?.email || payment.payment_method_details?.email;
    const payerName = payment.billing?.name || "Valued Customer";
    const amount = payment.amount / 100;
    const description = payment.description || "CodeMaster Pro Plan";
    const date = new Date(payment.created_at * 1000).toLocaleString();

    if (!payerEmail) {
      return NextResponse.json({ error: "No payer email found" }, { status: 400 });
    }

    // ✅ Replace all dots in email to make valid Firebase keys
    const safeEmail = payerEmail.replace(/\./g, "_");
    const subscriptionRef = db.ref(`subscription/${safeEmail}`);

    // Save purchase to Realtime Database
    await subscriptionRef.set({
      hasPurchasedPro: true,
      plan: description,
      amount,
      date,
    });
    console.log(`✅ Saved subscription for ${payerEmail} in RTDB`);

    // Send receipt email (non-blocking, errors will be logged but webhook continues)
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
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

      transporter.sendMail(mailOptions).then(() => {
        console.log(`📧 Receipt sent to ${payerEmail}`);
      }).catch((emailErr) => {
        console.error("❌ Email send failed:", emailErr);
      });
    } else {
      console.warn("⚠️ Email credentials missing, skipping email");
    }

    return NextResponse.json({
      success: true,
      message: "Purchase saved to RTDB and email triggered",
    });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}
