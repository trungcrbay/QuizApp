import type { Metadata } from "next";
import { Montserrat } from 'next/font/google'
import "./globals.css";
import NextAuthWrapper from "@/lib/next.auth.wrapper";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "QuizApp",
};

const montserrat = Montserrat({
  weight: '300',
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en" className={montserrat.className}>
      <body>
        <NextAuthWrapper>
          {children}
        </NextAuthWrapper>
      </body>
    </html>
  );
}
