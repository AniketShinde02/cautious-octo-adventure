
"use client"

import * as React from "react"
import { ThemeProvider } from '@/components/theme-provider';
import { SessionProvider } from 'next-auth/react';
import { AuthModalProvider } from "@/context/AuthModalContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <SessionProvider>
        <AuthModalProvider>
          {children}
        </AuthModalProvider>
      </SessionProvider>
    </ThemeProvider>
  )
}
