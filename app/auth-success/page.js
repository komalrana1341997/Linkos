"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthSuccess() {
  const router = useRouter();

  useEffect(() => {
    const url = window.location.search;
    const params = new URLSearchParams(url);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      router.push("/create");
    } else {
      router.push("/login");
    }
  }, [router]);

  return <div>Logging in...</div>;
}