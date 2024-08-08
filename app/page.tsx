// app/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/api/auth/login");
    router.push("/purchases");
  }, [router]);

  return null;
}
