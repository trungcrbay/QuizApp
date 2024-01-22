import type { Metadata } from "next";
import { Arimo } from 'next/font/google'
import "./globals.css";
import NextAuthWrapper from "@/lib/next.auth.wrapper";
import '../utils/i18n'

export const metadata: Metadata = {
  title: "Create Next App",
  description: "QuizApp",
};

const arimo = Arimo({
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en" className={arimo.className}>
      <body>
        <NextAuthWrapper>
          {children}
        </NextAuthWrapper>
      </body>
    </html>
  );
}
