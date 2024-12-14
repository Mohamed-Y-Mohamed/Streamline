"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const DarkModeContext = createContext<{
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}>({
  isDarkMode: false,
  toggleDarkMode: () => {},
});

// Provide the context
export const DarkModeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Ensure localStorage is only accessed on the client
  useEffect(() => {
    const darkModePreference =
      window.localStorage.getItem("darkMode") === "true";
    setIsDarkMode(darkModePreference);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      window.localStorage.setItem("darkMode", newMode.toString());
      return newMode;
    });
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

// Hook to use dark mode context
export const useDarkMode = () => useContext(DarkModeContext);
