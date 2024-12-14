// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DarkModeProvider } from "./darkController";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StreamLine",
  description:
    "An amazing app with separate layouts for public and authenticated pages.",
  icons: {
    icon: "/assets/file.png",
  },
};

export default function GlobalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>{/* Metadata is applied automatically here */}</head>
      <body className={inter.className}>
        <DarkModeProvider>{children}</DarkModeProvider>
      </body>
    </html>
  );
}
