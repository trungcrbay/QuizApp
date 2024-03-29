import type { Metadata } from "next";
import { Arimo } from 'next/font/google'
import "./globals.css";
import NextAuthWrapper from "@/lib/next.auth.wrapper";
import '../utils/i18n'

export const metadata: Metadata = {
  title: "QuizzApp",
  description: "QuizzApp",
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/icons.png',
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: '/icons.png',
      },
    ],
  },
  keywords:["quiz","quiz app", "practice","quiz for web"]
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
