import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // Close mobile menu on outside click or on escape
  useEffect(() => {
    function handleClick(e) {
      if (open && menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    function handleKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const links = [
    {label:"Home",path:"/"},
    {label:"Features",path:"/features"},
    {label:"Pricing",path:"/pricing"},
  ]

  return (
    <>
      <nav className="w-full bg-white/95 backdrop-blur-md fixed top-0 left-0 shadow-sm z-50 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-neutral-900 flex items-center justify-center text-white font-bold text-sm sm:text-base">
                MI
              </div>
              <h1 className="text-base sm:text-lg font-bold text-neutral-900">MediAI</h1>
            </div>

            {/* Desktop Links - hidden on mobile and tablet */}
            <ul className="hidden lg:flex gap-8 text-neutral-700 font-medium">
              {links.map((l) => (
                <Link
                  to={l.path}
                  key={l.label}
                  className="hover:text-neutral-900 transition-colors cursor-pointer"
                >
                  {l.label}
                </Link>
              ))}
            </ul>

            {/* Desktop actions - hidden on mobile and tablet */}
            <div className="hidden lg:flex gap-3 flex-shrink-0">
              <SignedOut>
                <SignInButton>
                  <button className="px-4 py-2 rounded-lg border border-neutral-300 hover:bg-neutral-100 transition-colors text-neutral-800 font-medium">
                      Login
                    </button>
                </SignInButton>
              </SignedOut>
              
              <SignedIn>
                <UserButton afterSignOutUrl="/"/>
              </SignedIn>
            </div>

            {/* Mobile menu button */}
            <button
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen(!open)}
              className="lg:hidden p-2 rounded-lg hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-300 transition-colors"
            >
              <svg
                className="w-6 h-6 text-neutral-800 transition-transform duration-200"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {open ? (
                  <path
                    d="M6 18L18 6M6 6l12 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                ) : (
                  <path
                    d="M3 6h18M3 12h18M3 18h18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile panel */}
        <div
          ref={menuRef}
          className={`lg:hidden bg-white border-t border-neutral-200 overflow-hidden transition-all duration-300 ease-in-out ${
            open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 sm:px-6 py-4 space-y-1">
            {links.map((item) => (
            <Link
              to={item.path}
              key={item.label}
              onClick={() => setOpen(false)}
              className="text-left w-full px-4 py-3 font-medium text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors block"
            >
              {item.label}
            </Link>
          ))}


            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <SignedOut>
                <SignInButton mode="modal">
                  <button
                    onClick={() => setOpen(false)}
                    className="w-full sm:flex-1 px-4 py-2.5 rounded-lg border border-neutral-300 hover:bg-neutral-100 transition-colors text-neutral-800 font-medium"
                  >
                    Login
                  </button>
                </SignInButton>
              </SignedOut>

              <SignedIn>
                <div className="w-full sm:flex-1 flex justify-start px-4">
                  <UserButton afterSignOutUrl="/" />
                </div>
              </SignedIn>
            </div>
          </div>
        </div>
      </nav>

     
    </>
  );
}