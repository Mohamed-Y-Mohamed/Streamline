"use client";

import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Image from "next/image";
import IntroNavbar from "@/components/Navbars/introNav";
import Footer from "@/components/footer/footer";
import { useAppSelector } from "@/app/redux";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useRegisterUserMutation, useGoogleSignInMutation } from "@/state/api";

const passwordRequirements = [
  { id: 1, label: "Minimum 8 characters", regex: /^.{8,}$/ },
  { id: 2, label: "At least 1 uppercase letter", regex: /[A-Z]/ },
  { id: 3, label: "At least 1 lowercase letter", regex: /[a-z]/ },
  { id: 4, label: "At least 1 number", regex: /[0-9]/ },
  {
    id: 5,
    label: "At least 1 special character (!@#$%^&*()_+=)",
    regex: /[!@#$%^&*()_+=]/,
  },
];
const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    termsAccepted: false,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isTermsVisible, setIsTermsVisible] = useState(false);

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const [registerUser, { isLoading: isRegistering }] =
    useRegisterUserMutation();
  const [googleSignIn, { isLoading: isGoogleSigningIn }] =
    useGoogleSignInMutation();

  const validateFields = (name: string, value: string) => {
    let errorMessage = "";

    if (name === "name" && !value.trim())
      errorMessage = "Full name is required.";
    if (name === "username") {
      if (!value.trim()) errorMessage = "Username is required.";
      else if (value.includes(" "))
        errorMessage = "Username cannot contain spaces.";
    }
    if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
      errorMessage = "Please enter a valid email.";
    if (name === "password") {
      const isValid = passwordRequirements.every((req) =>
        req.regex.test(value)
      );
      setIsPasswordValid(isValid);
      if (!isValid) errorMessage = "Password does not meet requirements.";
    }

    setErrors((prev) => ({ ...prev, [name]: errorMessage }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    validateFields(name, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isPasswordValid) {
      alert("Please ensure the password meets all requirements.");
      return;
    }

    if (!formData.termsAccepted) {
      alert("Please accept the terms and conditions.");
      return;
    }

    try {
      await registerUser(formData).unwrap();
      alert("Registration successful!");
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed. Please try again.");
    }
  };

  const handleGoogleSignInSuccess = async (credentialResponse: any) => {
    if (credentialResponse && credentialResponse.credential) {
      try {
        await googleSignIn({
          idToken: credentialResponse.credential,
        }).unwrap();
        alert("Google sign-in successful!");
      } catch (error) {
        console.error("Google sign-in error:", error);
        alert("Google sign-in failed. Please try again.");
      }
    }
  };

  const isAnyLoading = isRegistering || isGoogleSigningIn;

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <IntroNavbar />
      <div
        className={`font-[sans-serif] ${
          isDarkMode ? "bg-[#301934]" : "bg-white"
        } md:h-screen`}
      >
        <div className="grid md:grid-cols-2 items-center gap-8 h-full">
          <div className="max-md:order-1 p-4">
            <Image
              src="/assets/signin-image.webp"
              alt="Register Image"
              width={1000}
              height={1000}
              className="lg:max-w-[85%] w-full h-full object-contain block mx-auto"
            />
          </div>

          <div
            className={`flex items-center md:p-8 p-6 h-full lg:w-11/12 lg:ml-auto ${
              isDarkMode ? "bg-[#0C172C]" : "bg-gray-100"
            }`}
          >
            <form onSubmit={handleSubmit} className="max-w-lg w-full mx-auto">
              <div className="flex justify-center mb-4">
                <Image
                  src="/assets/file.png"
                  alt="Logo"
                  width={80}
                  height={80}
                />
              </div>
              <div className="mb-6">
                <h3 className="text-3xl font-bold text-yellow-400 text-center">
                  Create an account
                </h3>
              </div>

              <div className="mb-6">
                <div className="w-full">
                  <GoogleLogin
                    onSuccess={handleGoogleSignInSuccess}
                    onError={() => {
                      console.error("Google sign-in failed");
                      alert("Google sign-in failed. Please try again.");
                    }}
                  />
                </div>
              </div>

              {/* Full Name */}
              <div className="mb-8">
                <label className="text-white text-xs block mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-transparent text-sm text-white border-b border-gray-300 focus:border-yellow-400 px-2 py-3 outline-none"
                    placeholder="Enter full name"
                    disabled={isAnyLoading}
                  />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-xs">{errors.name}</p>
                )}
              </div>

              {/* Username */}
              <div className="mb-8">
                <label className="text-white text-xs block mb-2">
                  Username
                </label>
                <div className="relative">
                  <input
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full bg-transparent text-sm text-white border-b border-gray-300 focus:border-yellow-400 px-2 py-3 outline-none"
                    placeholder="Enter username"
                    disabled={isAnyLoading}
                  />
                </div>
                {errors.username && (
                  <p className="text-red-500 text-xs">{errors.username}</p>
                )}
              </div>

              {/* Email */}
              <div className="mb-8">
                <label className="text-white text-xs block mb-2">Email</label>
                <div className="relative">
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-transparent text-sm text-white border-b border-gray-300 focus:border-yellow-400 px-2 py-3 outline-none"
                    placeholder="Enter email"
                    disabled={isAnyLoading}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div className="mb-8">
                <label className="text-white text-xs block mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={() => setPasswordFocus(true)}
                    className="w-full bg-transparent text-sm text-white border-b border-gray-300 focus:border-yellow-400 px-2 py-3 outline-none"
                    placeholder="Enter password"
                    disabled={isAnyLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-3 text-gray-400"
                    disabled={isAnyLoading}
                  >
                    {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                  </button>
                </div>
                {passwordFocus &&
                  passwordRequirements.map((req) => (
                    <div key={req.id} className="text-xs flex items-center">
                      <span
                        className={`mr-2 ${
                          req.regex.test(formData.password)
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {req.regex.test(formData.password) ? "✔" : "✘"}
                      </span>
                      {req.label}
                    </div>
                  ))}
              </div>

              {/* Terms */}
              <div className="flex items-center mb-8">
                <input
                  id="termsAccepted"
                  name="termsAccepted"
                  type="checkbox"
                  checked={formData.termsAccepted}
                  readOnly
                  className="h-4 w-4 rounded"
                  disabled={isAnyLoading}
                />
                <label
                  htmlFor="termsAccepted"
                  className="text-white ml-3 block text-sm cursor-pointer"
                  onClick={() => !isAnyLoading && setIsTermsVisible(true)}
                >
                  I accept the{" "}
                  <span className="text-yellow-400 underline">
                    Terms and Conditions
                  </span>
                </label>
              </div>

              {/* Submit */}
              <div className="mb-12">
                <button
                  type="submit"
                  disabled={isAnyLoading}
                  className="w-full py-3 text-gray-800 font-semibold rounded-md bg-yellow-400 hover:bg-yellow-500"
                >
                  {isRegistering ? "Registering..." : "Register"}
                </button>
                <p className="text-sm text-white mt-8">
                  Already have an account?{" "}
                  <a
                    href="/auth/signin"
                    className="text-yellow-400 font-semibold hover:underline ml-1"
                  >
                    Signin
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Terms Modal */}
      {isTermsVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div
            className={`p-6 rounded-lg shadow-lg max-w-md ${
              isDarkMode ? "bg-[#0C172C]" : "bg-white"
            }`}
          >
            <h3 className="text-xl font-bold mb-4 text-yellow-400">
              Terms and Conditions
            </h3>
            <p>
              This is for portfolio purposes only. Use at your own discretion.
            </p>
            <div className="flex justify-end mt-4 space-x-4">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                onClick={() => {
                  if (!isAnyLoading) {
                    setFormData((prev) => ({ ...prev, termsAccepted: true }));
                    setIsTermsVisible(false);
                  }
                }}
              >
                Accept
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={() => {
                  if (!isAnyLoading) {
                    setIsTermsVisible(false);
                  }
                }}
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </GoogleOAuthProvider>
  );
};

export default Register;
