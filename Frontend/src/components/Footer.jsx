import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-neutral-300">
      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-white text-neutral-900 font-bold flex items-center justify-center">
                MI
              </div>
              <h2 className="text-lg font-semibold text-white">
                MediAI
              </h2>
            </div>
            <p className="text-sm text-neutral-400 max-w-xs">
              An AI-powered mental health assistant focused on calm,
              support, and emotional well-being.
            </p>
          </div>

          {/* Quick Links */}
          {/* <div>
            <h3 className="text-white font-medium mb-3">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Blog
                </a>
              </li>
            </ul>
          </div> */}

          {/* Support */}
          <div>
            <h3 className="text-white font-medium mb-3">
              Support
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-4 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-neutral-400">
          <p>© {currentYear} MediAI. All rights reserved.</p>

          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition">
              Twitter
            </a>
            <a href="#" className="hover:text-white transition">
              LinkedIn
            </a>
            <a href="#" className="hover:text-white transition">
              GitHub
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
