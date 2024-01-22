import type { Metadata } from "next";
import AppHeader from "@/component/header/header.module";
import ThemeRegistry from "../themes/ThemeRegistry";
import NextTopLoader from 'nextjs-toploader';

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
    <html lang="en">
      <body>
        <ThemeRegistry>
          <AppHeader />
          <NextTopLoader
            color="#2299DD"
            showSpinner={false}
            height={2}
          />
          {/* <Trans /> */}
          {children}
        </ThemeRegistry>
      </body>
    </html>
  );
}
