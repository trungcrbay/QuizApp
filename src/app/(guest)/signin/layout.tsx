import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "QuizApp",
};

export default function guestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
            {children}
      </body>
    </html>
  );
}
