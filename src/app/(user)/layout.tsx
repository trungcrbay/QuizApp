import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AppHeader from "@/component/header/header.module";
import NextAuthWrapper from "@/lib/next.auth.wrapper";
import ThemeRegistry from "../themes/ThemeRegistry";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "QuizApp",
};

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body>
        <ThemeRegistry>
          <AppHeader />
          {children}
        </ThemeRegistry>
      </body>
    </html>
  );
}
