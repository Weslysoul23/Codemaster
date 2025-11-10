// File: /app/api/create-paymongo-session/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, description } = body;

    if (typeof amount !== "number" || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    if (!description || typeof description !== "string") {
      return NextResponse.json({ error: "Invalid description" }, { status: 400 });
    }

    const response = await fetch("https://api.paymongo.com/v1/checkout_sessions", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Basic ${Buffer.from(
          `${process.env.PAYMONGO_SECRET_KEY}:`
        ).toString("base64")}`,
      },
      body: JSON.stringify({
        data: {
          attributes: {
            amount: Math.round(amount * 100), // PayMongo expects cents
            currency: "PHP",
            description,
            line_items: [
              {
                name: description,
                quantity: 1,
                amount: Math.round(amount * 100),
                currency: "PHP",
              },
            ],
            payment_method_types: ["card", "gcash", "paymaya"],
            success_url: "https://codemaster-thesis.vercel.app/payment-success",
            cancel_url: "https://codemaster-thesis.vercel.app/player-dashboard",
          },
        },
      }),
    });

    const data = await response.json();

    if (!data?.data?.attributes?.checkout_url) {
      console.error("❌ PayMongo API Error:", data);
      return NextResponse.json(
        { error: "Failed to create payment link", details: data },
        { status: 400 }
      );
    }

    return NextResponse.json({ checkout_url: data.data.attributes.checkout_url });
  } catch (err) {
    console.error("Server Error:", err);
    return NextResponse.json({ error: "Server error", details: String(err) }, { status: 500 });
  }
}
