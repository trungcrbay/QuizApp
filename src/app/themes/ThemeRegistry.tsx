'use client'

import { ThemeProvider } from 'next-themes'

export default function ThemeRegistry({
    children,
  }: {
    children: React.ReactNode;
  }) {
  return <ThemeProvider>{children}</ThemeProvider>
}