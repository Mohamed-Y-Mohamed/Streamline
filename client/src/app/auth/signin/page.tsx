"use client";

import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Image from "next/image";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useSignInMutation, useGoogleSignInMutation } from "@/state/api";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signIn, { isLoading: isSigningIn }] = useSignInMutation();
  const [googleSignIn] = useGoogleSignInMutation();
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await signIn({ email, password }).unwrap();
      alert("Sign-in successful!");
      router.push("/root/dashboard"); // Redirect to a protected route
    } catch (error) {
      console.error("Sign-in error:", error);
      alert("Invalid email or password.");
    }
  };

  const handleGoogleSignInSuccess = async (credentialResponse: any) => {
    if (credentialResponse && credentialResponse.credential) {
      try {
        const response = await googleSignIn({
          idToken: credentialResponse.credential,
        }).unwrap();
        alert("Google sign-in successful!");
        // Proceed to dashboard or store user data
        router.push("/root/projects/1");
      } catch (error) {
        console.error("Google sign-in error:", error);
        alert("Google sign-in failed. Please try again.");
      }
    }
  };

  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="font-[sans-serif] md:h-screen bg-[#301934]">
        <div className="grid md:grid-cols-2 items-center gap-8 h-full">
          {/* Left Side: Image */}
          <div className="p-4 bg-[#301934]">
            <Image
              src="/assets/signin-image.webp"
              className="lg:max-w-[85%] w-full h-full object-contain block mx-auto"
              alt="signin-image"
              width={1000}
              height={1000}
            />
          </div>

          {/* Right Side: Form */}
          <div className="flex items-center md:p-8 p-6 bg-[#0C172C] h-full lg:w-11/12 lg:ml-auto">
            <form className="max-w-lg w-full mx-auto" onSubmit={handleSignIn}>
              <div className="mb-12 text-center">
                {/* Logo */}
                <Image
                  src="/assets/file.png"
                  alt="Logo"
                  className="w-[7em] h-10 mx-auto mb-4"
                  width={1000}
                  height={1000}
                />
                <h3 className="text-3xl font-bold text-yellow-400">
                  Sign in to your account
                </h3>
              </div>

              {/* Sign in with Google */}
              <div className="mt-4 w-full">
                <GoogleLogin
                  onSuccess={handleGoogleSignInSuccess}
                  onError={() => {
                    console.error("Google sign-in failed");
                  }}
                />
              </div>

              {/* Email */}
              <div className="pt-10">
                <label className="text-white text-xs block mb-2">Email</label>
                <input
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-transparent text-sm text-white border-b border-gray-300 focus:border-yellow-400 px-2 py-3 outline-none"
                  placeholder="Enter email"
                />
              </div>

              {/* Password */}
              <div className="mt-8">
                <label className="text-white text-xs block mb-2">
                  Password
                </label>
                <div className="relative flex items-center">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-transparent text-sm text-white border-b border-gray-300 focus:border-yellow-400 px-2 py-3 outline-none"
                    placeholder="Enter password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 text-gray-400"
                  >
                    {showPassword ? (
                      <AiFillEyeInvisible className="w-5 h-5" />
                    ) : (
                      <AiFillEye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Sign In Button */}
              <div className="mt-12">
                <button
                  type="submit"
                  disabled={isSigningIn}
                  className="shadow-xl py-3 px-6 text-sm text-gray-800 font-semibold rounded-md bg-yellow-400 hover:bg-yellow-500 focus:outline-none"
                >
                  {isSigningIn ? "Signing In..." : "Sign In"}
                </button>
                <p className="text-sm text-white mt-8">
                  Don’t have an account?{" "}
                  <a
                    href="/auth/register"
                    className="text-yellow-400 font-semibold hover:underline ml-1"
                  >
                    Register here
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default SignIn;
