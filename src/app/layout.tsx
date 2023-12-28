import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppHeader from "@/component/header/header.module";
import NextAuthWrapper from "@/lib/next.auth.wrapper";
import ThemeRegistry from "./themes/ThemeRegistry";


export const metadata: Metadata = {
  title: "Create Next App",
  description: "QuizApp",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body>
        <NextAuthWrapper>
            {children}
        </NextAuthWrapper>
      </body>
    </html>
  );
}
