// app/auth/callback/page.tsx (if component is nested)
import { Suspense } from "react";
import AuthCallbackPage from "./AuthCallbackPage"; // your "use client" component

export default function CallbackPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthCallbackPage />
    </Suspense>
  );
}
