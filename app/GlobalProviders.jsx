"use client";
import { AuthProvider } from "@/context/auth";
import { AppearanceProvider } from "@/context/appearance";
import { SiteProvider } from "@/context/site";

export function GlobalProvider({ children, ...props }) {
  return (
    <>
      <AuthProvider>
        <SiteProvider>
          <AppearanceProvider>{children}</AppearanceProvider>
        </SiteProvider>
      </AuthProvider>
    </>
  );
}
