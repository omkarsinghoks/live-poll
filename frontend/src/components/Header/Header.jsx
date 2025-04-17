import React from "react";
import { Link } from "react-router-dom";
import useUserStore from "../../store/useStore";
import ProfileImage from "./ProfileImage";

function Header() {
  const { user } = useUserStore();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                LivePoll
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {user.username ? (
              <Link
                to="/dashboard"
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                to="/login"
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Login
              </Link>
            )}
            <Link
              to="/poll"
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Polls
            </Link>
          </nav>

          {/* Mobile menu button (would need implementation) */}
          <div className="md:hidden flex items-center">
            <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* Profile */}
          {user.username && (
            <div className="hidden md:flex items-center ml-4">
              <ProfileImage userData={user} />
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu (would need implementation) */}
      {/* <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {user.username ? (
            <Link
              to="/dashboard"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              to="/login"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
            >
              Login
            </Link>
          )}
          <Link
            to="/poll"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
          >
            Polls
          </Link>
        </div>
      </div> */}
    </header>
  );
}

export default Header;