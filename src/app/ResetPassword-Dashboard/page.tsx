import React, { Suspense } from "react";
import ResetPasswordForm from "./ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="reset-container">
          <div className="reset-card">
            <h2>RESET YOUR PASSWORD</h2>
            <p>Loading...</p>
          </div>
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
