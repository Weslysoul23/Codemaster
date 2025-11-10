import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, amount, description, date } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    await transporter.sendMail({
      from: `"CodeMaster" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your CodeMaster Payment Receipt",
      html: `<div style="font-family:Arial; background:#0a1b55; color:white; padding:20px; border-radius:10px;">
               <h2>CodeMaster Payment Receipt</h2>
               <p>Hi <b>${name}</b>,</p>
               <p>Thank you for subscribing to the <b>${description}</b>.</p>
               <p><b>Amount:</b> ₱${amount}</p>
               <p><b>Date:</b> ${date}</p>
             </div>`
    });

    return NextResponse.json({ success: true, message: "Email sent successfully" });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
