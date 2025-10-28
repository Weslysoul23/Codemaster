import type { NextApiRequest, NextApiResponse } from "next";
import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

export const firebaseAdmin = admin;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { token } = req.query;

  if (!token || typeof token !== "string") {
    return res.status(400).json({ error: "Missing or invalid token" });
  }

  try {
    // Verify ID token from Unity
    const decoded = await firebaseAdmin.auth().verifyIdToken(token);

    // Create a new custom token for the web app
    const customToken = await firebaseAdmin.auth().createCustomToken(decoded.uid);

    // Redirect to the dashboard with verified token
    res.redirect(`/player-dashboard?verified=${customToken}`);
  } catch (error: any) {
    console.error("❌ Token verification failed:", error);
    return res.status(400).json({ error: "Invalid or expired token" });
  }
}
