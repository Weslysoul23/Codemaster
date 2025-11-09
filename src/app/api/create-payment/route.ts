import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { amount, description, email } = await req.json();

    if (!email) return NextResponse.json({ error: "Email is required" }, { status: 400 });

    const response = await fetch("https://api.paymongo.com/v1/checkout_sessions", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Basic ${Buffer.from(process.env.PAYMONGO_SECRET_KEY + ":").toString("base64")}`,
      },
      body: JSON.stringify({
        data: {
          attributes: {
            amount: amount * 100,
            currency: "PHP",
            description,
            customer: { email }, // <-- user email
            line_items: [{ name: description, quantity: 1, amount: amount * 100, currency: "PHP" }],
            payment_method_types: ["card", "gcash", "paymaya"],
            success_url: "https://codemaster-thesis.vercel.app/payment-success",
            cancel_url: "https://codemaster-thesis.vercel.app/player-dashboard",
          },
        },
      }),
    });

    const data = await response.json();
    if (!data.data?.attributes?.checkout_url)
      return NextResponse.json({ error: "Failed to create payment link", details: data }, { status: 400 });

    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
