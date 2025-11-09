import { NextResponse } from "next/server";

interface PaymentRequestBody {
  amount: number;
  description: string;
  email: string;
  userId: string;
}

export async function POST(req: Request) {
  try {
    const { amount, description, email, userId }: PaymentRequestBody = await req.json();

    if (!email || !userId || !amount || !description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
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
            customer: { email },
            line_items: [{ name: description, quantity: 1, amount: amount * 100, currency: "PHP" }],
            payment_method_types: ["card", "gcash", "paymaya"],
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/player-dashboard`,
            metadata: { userId },
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
    return NextResponse.json({ error: "Server error", details: String(err) }, { status: 500 });
  }
}
