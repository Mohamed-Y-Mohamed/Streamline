"use client";

import { useEffect } from "react";
import { useAppSelector } from "@/app/redux";

const DarkModeHandler = () => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  // Apply or remove dark mode globally
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return null; // No UI rendering, just side-effect handling
};

export default DarkModeHandler;
