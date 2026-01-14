import { useClerk, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import React from "react";
import AIimage from "../assets/AIimage.jpeg"; // ✅ IMPORT IMAGE

export default function Hero() {
  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (isSignedIn) {
      navigate("/dashboard");
    } else {
      openSignIn();
    }
  };

  return (
    <section className="w-full min-h-screen bg-neutral-100 flex items-center justify-center px-6 py-20">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        
        {/* Left Text Section */}
        <div className="text-left">
          <h1 className="text-5xl md:text-6xl font-bold text-neutral-900 mb-6 leading-tight">
            Your Smart AI Medical <br /> Voice Assistant
          </h1>

          <p className="text-lg md:text-xl text-neutral-600 max-w-lg mb-10">
            Get instant medical guidance, symptom checks, and health insights using our advanced AI-powered voice assistant. Reliable, fast, and always available.
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={handleGetStarted}
              className="px-6 py-3 rounded-xl bg-neutral-900 text-neutral-100 font-medium hover:bg-neutral-800 transition-all shadow-md"
            >
              Get Started
            </button>

            <button className="px-6 py-3 rounded-xl border border-neutral-400 text-neutral-800 font-medium hover:bg-neutral-200 transition-all">
              View Features
            </button>
          </div>
        </div>

        {/* Right Illustration Section */}
        <div className="flex justify-center">
          <div className="w-72 h-72 md:w-96 md:h-96 overflow-hidden">
            <img
              src={AIimage} // ✅ CORRECT USAGE
              alt="AI Medical Assistant Banner"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
