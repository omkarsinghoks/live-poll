import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "react-query";
import signupUserService from "../services/signupUserService";
import InlineTextError from "../components/Errors/InlineTextError";
import SpinnerLoader from "../components/Loaders/SpinnerLoader";
import { FiUser, FiMail, FiLock, FiArrowRight } from "react-icons/fi";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const mutation = useMutation(signupUserService, {
    onSuccess: (data) => {
      console.log(data);
      setUsername("");
      setEmail("");
      setPassword("");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  function handleSignup(e) {
    e.preventDefault();
    e.stopPropagation();
    mutation.mutate({
      username,
      email,
      password,
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-center">
          <h2 className="text-3xl font-bold text-white">Create Account</h2>
          <p className="text-indigo-100 mt-2">Join our community today</p>
        </div>

        {/* Form Section */}
        <div className="p-6 sm:p-8">
          <form className="space-y-5">
            {/* Username Input */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="text-gray-400" />
                </div>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  placeholder="john_doe"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  required
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-gray-400" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  required
                />
              </div>
            </div>

            {/* Messages */}
            <div className="min-h-6">
              {mutation.isError && <InlineTextError mutation={mutation} />}
              {mutation.isSuccess && (
                <p className="text-green-600 text-sm font-medium">
                  🎉 {mutation.data.message || "Registration successful!"}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSignup}
              type="submit"
              disabled={mutation.isLoading}
              className="w-full flex justify-center items-center py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-purple-700 transition shadow-md disabled:opacity-70"
            >
              {mutation.isLoading ? (
                <SpinnerLoader />
              ) : (
                <>
                  Sign Up <FiArrowRight className="ml-2" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink mx-4 text-gray-400 text-sm">OR</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          {/* Login Link */}
          <p className="text-center text-gray-600 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline transition"
            >
              Log in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;