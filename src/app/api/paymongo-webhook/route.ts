import { NextResponse } from "next/server";
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

    if (!["payment.paid", "link.payment.paid"].includes(event.type))
      return NextResponse.json({ message: "Not a paid event" });

    const payment = event.data.attributes;
    const userId = payment.metadata?.userId;
    if (!userId) return NextResponse.json({ error: "Missing userId" }, { status: 400 });

    // Mark purchase as paid
    await admin.database().ref(`purchases/${userId}/LVL 6 - Stage final boss`).set({ paid: true });

    // Create a custom token for Unity/web auto-login
    const customToken = await admin.auth().createCustomToken(userId);

    return NextResponse.json({ success: true, customToken });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}
