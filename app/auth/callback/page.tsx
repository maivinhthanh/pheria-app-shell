"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      // Save token to localStorage or cookies
      localStorage.setItem("accessToken", token);
      // Redirect user to home or dashboard
      router.replace("/");
    } else {
      // No token, redirect to login
      router.replace("/login");
    }
  }, [router, searchParams]);

  return <div>Logging you in...</div>;
}
