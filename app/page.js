"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const route = useRouter();
  useEffect(() => {
    route.push("/admin");
  }, []);
  return (
    <main
      className="flex min-h-screen gap-20 
    items-center justify-center p-24
   
    "
    ></main>
  );
}
