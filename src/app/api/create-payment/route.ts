import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { amount, description, userId } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
    }

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
            line_items: [
              { name: description, quantity: 1, amount: amount * 100, currency: "PHP" },
            ],
            payment_method_types: ["card", "gcash", "paymaya"],
            success_url: `https://codemaster-thesis.vercel.app/payment-success?user=${userId}`,
            cancel_url: "https://codemaster-thesis.vercel.app/player-dashboard",
          },
        },
      }),
    });

    const data = await response.json();

    if (!data.data?.attributes?.checkout_url) {
      console.error("❌ PayMongo API Error:", data);
      return NextResponse.json({ error: "Failed to create payment link", details: data }, { status: 400 });
    }

    // ✅ Store user + checkout info (optional)
    // You can later use this to match PayMongo webhooks with Firebase users
    // Example: await savePendingPayment(userId, data.data.id);

    return NextResponse.json(data);
  } catch (err) {
    console.error("Server Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
