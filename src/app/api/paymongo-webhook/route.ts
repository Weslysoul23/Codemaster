import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
    databaseURL: process.env.DATABASE_URL,
  });
}

export async function POST(req: Request) {
  try {
    const event = await req.json();

    if (event.type !== "payment.paid" && event.type !== "link.payment.paid")
      return NextResponse.json({ message: "Not a paid event" });

    const payment = event.data.attributes;
    const payerEmail = payment.billing?.email || payment.payment_method_details?.email;
    const payerName = payment.billing?.name || "Valued Customer";
    const amount = payment.amount / 100;
    const description = payment.description || "CodeMaster Plan";
    const date = new Date(payment.created_at * 1000).toLocaleString();
    const userId = payment.metadata?.userId; // Pass Unity userId in metadata when creating session

    if (!payerEmail || !userId)
      return NextResponse.json({ error: "Missing payer email or userId" }, { status: 400 });

    // Update Firebase
    await admin.database().ref(`purchases/${userId}/LVL 6 - Stage final boss`).set({ paid: true });

    // Send email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    await transporter.sendMail({
      from: `"CodeMaster" <${process.env.EMAIL_USER}>`,
      to: payerEmail,
      subject: "Your CodeMaster Payment Receipt",
      html: `<div style="font-family:Arial, sans-serif; background:#0a1b55; color:white; padding:20px; border-radius:10px;">
               <h2>CodeMaster Payment Receipt</h2>
               <p>Hi <b>${payerName}</b>,</p>
               <p>Thank you for subscribing to <b>${description}</b>.</p>
               <p><b>Amount:</b> ₱${amount}</p>
               <p><b>Date:</b> ${date}</p>
             </div>`,
    });

    return NextResponse.json({ success: true, message: "Payment confirmed and email sent" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}
