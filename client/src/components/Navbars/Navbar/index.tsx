"use client";
import React from "react";
import { Menu, Moon, Search, Settings, Sun } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsDarkMode, setIsSidebarCollapsed } from "@/state";
import { useSignOutMutation, useGetUserDetailsQuery } from "@/state/api";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const {
    data: user,
    isLoading: isUserLoading,
    error: userError,
  } = useGetUserDetailsQuery();

  const [signOut, { isLoading: isSigningOut }] = useSignOutMutation();

  // Handle sign out
  const handleSignOut = async () => {
    try {
      await signOut().unwrap();
      router.push("/auth/signin");
    } catch (error) {
      console.error("Error during sign out:", error);
    }
  };

  return (
    <div className="flex items-center justify-between bg-white px-4 py-3 dark:bg-black">
      {/* Left Section: Menu, Logo, Search */}
      <div className="flex items-center gap-4">
        {/* Menu Button */}
        <button
          onClick={() => dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))}
        >
          <Menu className="h-8 w-8 dark:text-white" />
        </button>

        {/* Logo (Visible Only When Sidebar Is Collapsed) */}
        {isSidebarCollapsed && (
          <Image
            src="/assets/file.png"
            alt="Logo"
            width={30}
            height={30}
            className="block"
          />
        )}

        {/* Search Bar */}
        <div className="relative flex h-min w-[200px]">
          <Search className="absolute left-[4px] top-1/2 mr-2 h-5 w-5 -translate-y-1/2 transform cursor-pointer dark:text-white" />
          <input
            className="w-full rounded border-none bg-gray-100 p-2 pl-8 placeholder-gray-500 focus:border-transparent focus:outline-none dark:bg-gray-700 dark:text-white dark:placeholder-white"
            type="search"
            placeholder="Search..."
          />
        </div>
      </div>

      {/* Right Section: Icons */}
      <div className="flex items-center">
        {/* Dark Mode Toggle */}
        <button
          onClick={() => dispatch(setIsDarkMode(!isDarkMode))}
          className={
            isDarkMode
              ? "rounded p-2 dark:hover:bg-gray-700 hover:bg-gray-100"
              : "rounded p-2 hover:bg-gray-100"
          }
        >
          {isDarkMode ? (
            <Sun className="h-6 w-6 cursor-pointer dark:text-white" />
          ) : (
            <Moon className="h-6 w-6 cursor-pointer dark:text-white" />
          )}
        </button>

        {/* Settings Link */}
        <Link
          href="/settings"
          className={
            isDarkMode
              ? "h-min w-min rounded p-2 dark:hover:bg-gray-700"
              : "h-min w-min rounded p-2 hover:bg-gray-100"
          }
        >
          <Settings className="h-6 w-6 cursor-pointer dark:text-white" />
        </Link>

        {/* Divider */}
        <div className="ml-2 mr-5 hidden min-h-[2em] w-[0.1rem] bg-gray-200 md:inline-block"></div>

        {/* User Info */}
        <div className="hidden items-center justify-between md:flex">
          <div className="align-center flex h-9 w-9 justify-center">
            {isUserLoading ? (
              <div className="animate-pulse h-9 w-9 bg-gray-300 rounded-full"></div>
            ) : (
              <Image
                src={user?.profilePictureUrl || "/assets/anonymous.png"}
                alt="User Profile"
                width={36}
                height={36}
                className="rounded-full object-cover"
              />
            )}
          </div>
          <span className="mx-3 text-gray-800 dark:text-white">
            {isUserLoading ? "Loading..." : user?.username || "Guest"}
          </span>
          <button
            onClick={handleSignOut}
            disabled={isSigningOut}
            className={`hidden rounded bg-blue-400 px-4 py-2 text-xs font-bold text-white hover:bg-blue-500 md:block ${
              isSigningOut ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSigningOut ? "Signing out..." : "Sign out"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
