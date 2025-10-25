"use client";

import { db } from "@/lib/firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export async function submitFeedback(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  try {
    const docRef = await addDoc(collection(db, "feedbacks"), {
      ...data,
      createdAt: Timestamp.now(),
    });

    return { success: true, id: docRef.id };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
