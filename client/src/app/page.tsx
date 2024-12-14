"use client";

import React from "react";
import { useDarkMode } from "./darkController";
import IntroNavbar from "../components/Navbars/introNav";
import { features } from "./feature"; // Import features data

const LandingPage = () => {
  const { isDarkMode } = useDarkMode();

  return (
    <div
      className={
        isDarkMode ? "bg-[#28282B] text-white" : "bg-[#ffffff] text-gray-900"
      }
    >
      <IntroNavbar />

      {/* Hero Section */}
      <div
        className={`relative flex flex-col-reverse py-16 lg:pt-0 lg:flex-col lg:pb-0 ${
          isDarkMode ? "bg-[#18003b]" : "bg-[#ffffff]"
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
            src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
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
                href="/"
                className="inline-flex items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-indigo-600 hover:bg-indigo-700 focus:shadow-outline focus:outline-none"
              >
                Get started
              </a>
              <a
                href="/"
                className="inline-flex items-center font-semibold text-gray-800 dark:text-gray-300 hover:text-indigo-600"
              >
                Learn more
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
                      {/* Replace with feature icons */}
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
      <footer
        className={`relative ${isDarkMode ? "bg-[#18003b]" : "bg-white"}`}
      >
        <div className="absolute inset-x-0 bottom-0">
          <svg
            viewBox="0 0 224 12"
            fill="currentColor"
            className="w-full -mb-1 text-white"
            preserveAspectRatio="none"
          >
            <path d="M0,0 C48.8902582,6.27314026 86.2235915,9.40971039 112,9.40971039 C137.776408,9.40971039 175.109742,6.27314026 224,0 L224,12.0441132 L0,12.0441132 L0,0 Z"></path>
          </svg>
        </div>
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="relative max-w-2xl sm:mx-auto sm:max-w-xl md:max-w-2xl sm:text-center">
            <h2
              className={`mb-6 font-sans text-3xl font-bold tracking-tight ${
                isDarkMode ? "text-white" : "text-black"
              } sm:text-4xl sm:leading-none`}
            >
              The quick, brown fox
              <br className="hidden md:block" />
              jumps over a
              <span className="relative inline-block px-2">
                <div
                  className={`absolute inset-0 transform -skew-x-12 ${
                    isDarkMode ? "bg-teal-700" : "bg-teal-accent-400"
                  }`}
                ></div>
                <span
                  className={`relative ${
                    isDarkMode ? "text-teal-500" : "text-teal-900"
                  }`}
                >
                  lazy dog
                </span>
              </span>
            </h2>
            <p
              className={`mb-6 text-base ${
                isDarkMode ? "text-gray-400" : "text-gray-900"
              } md:text-lg`}
            >
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae. explicabo. Sed ut perspiciatis unde omnis.
            </p>
            <form className="flex flex-col items-center w-full mb-4 md:flex-row md:px-16">
              <input
                placeholder="Email"
                required
                type="text"
                className={`flex-grow w-full h-12 px-4 mb-3 transition duration-200 border-2 border-transparent rounded appearance-none md:mr-2 md:mb-0 focus:outline-none focus:shadow-outline ${
                  isDarkMode
                    ? "text-gray-200 bg-[#aaaab6] focus:border-teal-500"
                    : "text-gray-800 bg-[#ffffff] focus:border-teal-accent-700"
                }`}
              />
              <a
                href="/"
                className={`inline-flex items-center justify-center w-full h-12 px-6 font-semibold tracking-wide transition duration-200 rounded shadow-md md:w-auto focus:shadow-outline focus:outline-none ${
                  isDarkMode
                    ? "text-gray-900 bg-teal-400 hover:bg-teal-500"
                    : "text-teal-100 bg-purple-950 hover:bg-purple-600"
                }`}
              >
                Subscribe
              </a>
            </form>
            <p
              className={`max-w-md mb-10 text-xs tracking-wide sm:text-sm sm:mx-auto md:mb-16 ${
                isDarkMode ? "text-gray-400" : "text-gray-700"
              }`}
            >
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque.
            </p>
            <a
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Scroll to top"
              className={`flex items-center justify-center w-10 h-10 mx-auto duration-300 transform border rounded-full hover:shadow hover:scale-110 ${
                isDarkMode
                  ? "text-gray-300 border-gray-400 hover:text-teal-400 hover:border-teal-400"
                  : "text-white border-gray-400 hover:text-teal-accent-400 hover:border-teal-accent-400"
              } cursor-pointer`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="currentColor"
              >
                <path d="M10.293,8.707,6,4.414,1.707,8.707A1,1,0,1,1,.293,7.293l5-5a1,1,0,0,1,1.414,0l5,5a1,1,0,1,1-1.414,1.414Z"></path>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
