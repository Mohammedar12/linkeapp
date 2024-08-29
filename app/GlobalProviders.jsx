"use client";
import { AuthProvider } from "@/context/auth";
import { AppearanceProvider } from "@/context/appearance";
import { SiteProvider } from "@/context/site";

import { ThemeProvider as NextThemesProvider } from "next-themes";

import { Toaster } from "sonner";

import "react-toastify/dist/ReactToastify.css";

export function GlobalProvider({ children, ...props }) {
  return (
    <>
      <Toaster />
      <AuthProvider>
        <SiteProvider>
          <AppearanceProvider>{children}</AppearanceProvider>
        </SiteProvider>
      </AuthProvider>
    </>
  );
}
