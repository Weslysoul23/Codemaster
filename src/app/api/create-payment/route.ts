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

    // Basic validation
    if (!email) return NextResponse.json({ error: "Email is required" }, { status: 400 });
    if (!userId) return NextResponse.json({ error: "UserId is required" }, { status: 400 });
    if (!amount || amount <= 0) return NextResponse.json({ error: "Amount must be greater than 0" }, { status: 400 });
    if (!description) return NextResponse.json({ error: "Description is required" }, { status: 400 });

    // Create PayMongo checkout session
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
            amount: amount * 100, // PayMongo expects amount in cents
            currency: "PHP",
            description,
            customer: { email },
            line_items: [
              { name: description, quantity: 1, amount: amount * 100, currency: "PHP" }
            ],
            payment_method_types: ["card", "gcash", "paymaya"],
            success_url: "https://codemaster-thesis.vercel.app/payment-success",
            cancel_url: "https://codemaster-thesis.vercel.app/player-dashboard",
            metadata: { userId } // attach Unity userId for webhook tracking
          }
        }
      })
    });

    const data = await response.json();

    if (!data.data?.attributes?.checkout_url) {
      console.error("❌ PayMongo API failed to return checkout_url:", data);
      return NextResponse.json({ error: "Failed to create payment link", details: data }, { status: 400 });
    }

    return NextResponse.json(data);

  } catch (err) {
    console.error("Server error creating PayMongo checkout:", err);
    return NextResponse.json({ error: "Server error", details: String(err) }, { status: 500 });
  }
}
