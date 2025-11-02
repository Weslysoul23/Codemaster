import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, amount, description, date } = await req.json();

    console.log("📨 Email request received:", { name, email, amount, description, date });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"CodeMaster" <${process.env.EMAIL_USER}>`,
      to: email || process.env.NOTIFY_RECEIVER,
      subject: "Payment Confirmation - CodeMaster Pro Plan",
      html: `
        <h2>Payment Successful 🎉</h2>
        <p>Hi ${name},</p>
        <p>Your <strong>${description}</strong> payment of <strong>$${amount}</strong> was received on ${date}.</p>
        <p>Thank you for supporting CodeMaster!</p>
      `,
    });

    console.log("✅ Email sent successfully!", info.messageId);
    return Response.json({ success: true });
  } catch (error: any) {
    console.error("❌ Email send error:", error);
    return new Response("Failed to send email.", { status: 500 });
  }
}
