"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Sun, Moon } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/app/redux"; // Redux hooks
import { setIsDarkMode } from "@/state"; // Redux action for dark mode

const IntroNavbar = () => {
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handle toggling dark mode
  const handleDarkModeToggle = () => {
    dispatch(setIsDarkMode(!isDarkMode));
  };

  // Handle opening and closing mobile menu
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav
      className={`fixed w-full z-20 top-0 start-0 border-b ${
        isDarkMode
          ? "bg-black text-white border-gray-600"
          : "bg-white text-gray-900 border-gray-200"
      }`}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo and Brand */}
        <a href="/" className="flex items-center space-x-3">
          <Image
            src="/assets/file.png"
            alt="Logo"
            width={40}
            height={40}
            className="block"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            StreamLine
          </span>
        </a>

        {/* Mobile and Dark Mode Controls */}
        <div className="flex md:order-2 space-x-3 items-center">
          {/* Dark Mode Toggle */}
          <button
            onClick={handleDarkModeToggle}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800"
          >
            {isDarkMode ? (
              <Sun className="h-6 w-6 text-white" />
            ) : (
              <Moon className="h-6 w-6 text-gray-900" />
            )}
          </button>

          {/* Get Started Button */}
          <a href="/auth/signin">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Get started
            </button>
          </a>

          {/* Hamburger Menu (Mobile View) */}
          <button
            onClick={toggleMenu}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            {isMenuOpen ? (
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Desktop Menu */}
        <div
          className={`items-center justify-between hidden w-full md:flex md:w-auto md:order-1`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-transparent">
            <li>
              <Link
                href="/"
                className={`block py-2 px-3 rounded md:bg-transparent md:p-0 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className={`block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}
              >
                About
              </Link>
            </li>
          </ul>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div
            className={`absolute top-16 right-4 w-full max-w-xs rounded-lg shadow-lg ${
              isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
            }`}
          >
            <ul className="flex flex-col p-4 space-y-4">
              <li>
                <Link
                  href="/"
                  className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default IntroNavbar;
