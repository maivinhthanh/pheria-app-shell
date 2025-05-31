"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { logout } from "@/src/services/auth.service";

export default function Header() {
  const { data: session, status } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Close popover on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setPopoverOpen(false);
      }
    }
    if (popoverOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popoverOpen]);

  const handleLogout = async () => {
    try {
      const res = logout(session?.refreshToken || "");

      if (!!res) {
        signOut({ callbackUrl: "/" });
      } else {
        console.log("Logout failed");
      }
    } catch (e) {
      console.log("Logout error", e);
    }
  };

  // Get initials from user name, fallback to "U"
  const initials = session?.user?.name
    ? session.user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "U";

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <div className="text-indigo-600 font-extrabold text-xl tracking-wide">
                StoryAI
              </div>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8 font-medium text-gray-700">
            <Link href="/">
              <div className="hover:text-indigo-600 transition">Home</div>
            </Link>
            <Link href="/library">
              <div className="hover:text-indigo-600 transition">Library</div>
            </Link>
            <Link href="/editor">
              <div className="hover:text-indigo-600 transition">Editor</div>
            </Link>
          </nav>

          {/* User/Profile & Hamburger */}
          <div className="flex items-center space-x-4 relative">
            {status === "loading" ? (
              <div className="text-gray-500">Loading...</div>
            ) : session?.user ? (
              <>
                {/* Profile Avatar Button */}
                <button
                  aria-label="User menu"
                  aria-expanded={popoverOpen}
                  onClick={() => setPopoverOpen(!popoverOpen)}
                  className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {initials}
                </button>

                {/* Popover Dropdown */}
                {popoverOpen && (
                  <div
                    ref={popoverRef}
                    className="absolute right-0 mt-12 w-48 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-10 z-50
                    transform transition ease-out duration-200 origin-top-right
                    animate-popover-open top-1"
                  >
                    <div className="py-3 border-b border-gray-200 px-5">
                      <p className="text-gray-900 font-semibold text-sm truncate">
                        {session.user.name}
                      </p>
                      <p className="text-gray-500 text-xs truncate">
                        {session.user.email}
                      </p>
                    </div>

                    <div className="py-1">
                      <Link
                        href="/profile"
                        className="block px-5 py-3 text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 transition"
                        onClick={() => setPopoverOpen(false)}
                      >
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 transition"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <Link href="/login">
                <div className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded hover:bg-indigo-600 hover:text-white transition">
                  Login
                </div>
              </Link>
            )}

            {/* Hamburger Button */}
            <button
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
              className="md:hidden p-2 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg
                className="h-6 w-6 text-gray-700"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-white border-t border-gray-200 px-4 py-3 space-y-2 font-medium">
          <Link href="/">
            <div className="block">Home</div>
          </Link>
          <Link href="/library">
            <div className="block">Library</div>
          </Link>
          <Link href="/editor">
            <div className="block">Editor</div>
          </Link>
        </nav>
      )}
    </header>
  );
}
