"use client";

import React, { useEffect } from "react";
import StoreProvider from "./redux"; // Redux Provider
import { useAppSelector } from "@/app/redux"; // Redux hooks for global state

const DarkModeHandler = () => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return null;
};

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProvider>
      <DarkModeHandler />
      {children}
    </StoreProvider>
  );
}
