import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, amount, description, date } = await req.json();

    if (!email) {
      return new Response(JSON.stringify({ error: "Email is required" }), { status: 400 });
    }

    // Gmail SMTP transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"CodeMaster" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your CodeMaster Payment Receipt",
      html: `
        <div style="font-family:Arial, sans-serif; background:#0a1b55; color:white; padding:20px; border-radius:10px;">
          <h2>💻 CodeMaster Payment Receipt</h2>
          <p>Hi <b>${name}</b>,</p>
          <p>Thank you for subscribing to the <b>${description}</b>.</p>
          <p><b>Amount:</b> ₱${amount}</p>
          <p><b>Date:</b> ${date}</p>
          <hr/>
          <p style="font-size:12px;">If you did not make this payment, please contact support immediately.</p>
        </div>
      `,
    };

    // ✅ Wait for the mail to send before responding
    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ success: true, message: "Email sent successfully" }), { status: 200 });

  } catch (error) {
    console.error("❌ Email send error:", error);
    return new Response(JSON.stringify({ success: false, error: String(error) }), { status: 500 });
  }
}
