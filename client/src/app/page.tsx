"use client";

import React from "react";
import { useAppSelector } from "../app/redux"; // Import Redux hooks
import IntroNavbar from "../components/Navbars/introNav";
import { features } from "./feature"; // Import features data
import Footer from "@/components/footer/footer";

const LandingPage = () => {
  // Get the dark mode state from Redux
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  return (
    <div
      className={
        isDarkMode ? "bg-[#28282B] text-white" : "bg-[#ffffff] text-gray-900"
      }
    >
      {/* Navbar */}
      <IntroNavbar />

      {/* Hero Section */}
      <div
        className={`relative flex py-24 flex-col-reverse py-16 lg:pt-0 lg:flex-col md:py-12 sm:py-12 lg:pb-0 ${
          isDarkMode ? "bg-[#18003b]" : "bg-white"
        }`}
      >
        <div className="inset-y-0 top-0 right-0 z-0 w-full max-w-xl px-4 mx-auto md:px-0 lg:pr-0 lg:mb-0 lg:mx-0 lg:w-7/12 lg:max-w-full lg:absolute xl:px-0">
          <svg
            className={`absolute left-0 hidden h-full ${
              isDarkMode ? "text-[#18003b]" : "text-white"
            } transform -translate-x-1/2 lg:block`}
            viewBox="0 0 100 100"
            fill="currentColor"
            preserveAspectRatio="none slice"
          >
            <path d="M50 0H100L50 100H0L50 0Z" />
          </svg>
          <img
            className="object-cover w-full h-56 rounded shadow-lg lg:rounded-none lg:shadow-none md:h-96 lg:h-full"
            src="/assets/hero.jpg"
            alt="Hero Image"
          />
        </div>
        <div className="relative flex flex-col items-start w-full max-w-xl px-4 mx-auto md:px-0 lg:px-8 lg:max-w-screen-xl">
          <div className="mb-16 lg:my-40 lg:max-w-lg lg:pr-5">
            <h2 className="mb-5 font-sans text-3xl font-bold tracking-tight sm:text-4xl sm:leading-none">
              Everything you can imagine{" "}
              <span className="inline-block text-indigo-600">is real</span>
            </h2>
            <p className="pr-5 mb-5 text-base md:text-lg">
              Explore project management features tailored to your needs,
              including collaboration, task tracking, and analytics.
            </p>
            <div className="flex items-center">
              <a
                href="/auth/register"
                className="inline-flex items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-indigo-600 hover:bg-indigo-700 focus:shadow-outline focus:outline-none"
              >
                Get started
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <section
        className={`py-16 px-4 mx-auto max-w-screen-xl ${
          isDarkMode ? "bg-[#28282B] text-white" : "bg-[#ffffff] text-gray-900"
        }`}
      >
        <div className="gap-16 items-center lg:grid lg:grid-cols-2">
          <div>
            <h2 className="mb-4 text-4xl font-extrabold">
              Collaborate Seamlessly
            </h2>
            <p className="mb-4">
              Bring your team together with intuitive tools designed to enhance
              productivity. Add members, assign roles, and track progress with
              ease.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <img
              className="w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png"
              alt="Office Collaboration"
            />
            <img
              className="mt-4 w-full lg:mt-10 rounded-lg"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png"
              alt="Teamwork"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        className={`py-24 sm:py-32 ${
          isDarkMode ? "bg-[#28282B] text-white" : "bg-[#ffffff] text-gray-900"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold text-indigo-600">
              Features
            </h2>
            <p className="mt-2 text-4xl font-extrabold sm:text-5xl">
              Everything your team needs
            </p>
            <p className="mt-6 text-lg">
              Explore the tools and features designed to help your team manage
              projects and achieve their goals effectively.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-4xl grid gap-y-10 lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.id} className="relative pl-16">
                <dt className="text-lg font-bold">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <svg
                      className="h-6 w-6 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 16.5V9.75m0 0 3 3m-3-3-3 3"
                      />
                    </svg>
                  </div>
                  {feature.title}
                </dt>
                <dd className="mt-2 text-base">{feature.description}</dd>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
