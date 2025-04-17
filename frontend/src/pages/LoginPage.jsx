// LoginPage.js
import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import { loginService } from '../services/loginService';
import SpinnerLoader from '../components/Loaders/SpinnerLoader';
import InlineTextError from '../components/Errors/InlineTextError';
import useUserStore from '../store/useStore';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigator = useNavigate();
  const { setUser } = useUserStore();

  const mutation = useMutation(loginService, {
    onSuccess: (data) => {
      setUser(data?.user);
      toast.success(data?.message);
      setEmail('');
      setPassword('');
      navigator('/');
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleLogin = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!email.trim() || !password.trim()) {
      return;
    }
    mutation.mutate({ email, password });
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-center">
          <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
          <p className="text-blue-100 mt-1">Sign in to your account</p>
        </div>
        
        <div className="p-8">
          <form className="space-y-5">
            {/* Email Input */}
            <div className="form-group">
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Email
              </label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email" 
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required 
              />
            </div>

            {/* Password Input */}
            <div className="form-group">
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Password
              </label>
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Enter your password" 
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required 
              />
            </div>

            {/* Error Message */}
            {mutation.isError && <InlineTextError mutation={mutation} />}

            {/* Success Message */}
            {mutation.isSuccess && (
              <div className="p-3 bg-green-50 text-green-700 rounded-lg text-sm">
                🎉 {mutation.data.message || "Login successful"}
              </div>
            )}

            {/* Forgot Password Link */}
            <div className="flex justify-end">
              <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors">
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <div>
              <button 
                onClick={handleLogin}
                type="submit" 
                disabled={mutation.isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg shadow-sm transition-all duration-300 ease-in-out transform hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {mutation.isLoading ? (
                  <div className="flex items-center justify-center">
                    <SpinnerLoader />
                    <span className="ml-2">Signing in...</span>
                  </div>
                ) : "Sign In"}
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500 text-sm">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-600 font-medium hover:text-blue-800 hover:underline transition-colors">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;