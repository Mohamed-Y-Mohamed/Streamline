import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "./clientLayout"; // Import client-specific functionality
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StreamLine",
  description:
    "An amazing app with separate layouts for public and authenticated pages.",
  icons: {
    icon: "/assets/file.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
