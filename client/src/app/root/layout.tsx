// src/app/(root)/layout.tsx
import DashboardWrapper from "./dashboardWrapper";
import "../globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DashboardWrapper>{children}</DashboardWrapper>;
}
