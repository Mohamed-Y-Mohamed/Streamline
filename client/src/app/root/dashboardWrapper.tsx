"use client";

import React from "react";
import Navbar from "@/components/Navbars/Navbar";
import Sidebar from "@/components/Navbars/Sidebar";
import { useAppSelector } from "@/app/redux";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  return (
    <div className="flex min-h-screen w-full bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-white">
      <Sidebar />
      <main
        className={`flex w-full flex-col ${
          isSidebarCollapsed ? "" : "md:pl-64"
        }`}
      >
        <Navbar />
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
