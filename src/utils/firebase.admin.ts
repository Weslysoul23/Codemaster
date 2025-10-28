import admin, { ServiceAccount } from "firebase-admin";

let firebaseAdminApp: admin.app.App | null = null;

export function getFirebaseAdmin() {
  if (typeof window !== "undefined") {
    throw new Error("Firebase Admin SDK cannot run on the client");
  }

  if (!firebaseAdminApp) {
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");
    if (!privateKey) throw new Error("Missing FIREBASE_PRIVATE_KEY");

    const serviceAccount: ServiceAccount = {
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey,
    };

    firebaseAdminApp = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  return firebaseAdminApp;
}

export const firebaseAdmin = getFirebaseAdmin();
