import { useState } from "react";
import { FaRobot } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import AIChat from "./AIChat";

const AIChatWidget = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating panel */}
      {open && (
        <div
          role="dialog"
          aria-label="AI Buddy chat"
          className="animate-fade-in-up fixed bottom-24 right-4 z-[90] flex h-[70vh] max-h-[600px] w-[380px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-[#322F5C] bg-[#1C1A3B] shadow-2xl shadow-black/50 sm:right-6"
        >
          <div className="flex shrink-0 items-center justify-between border-b border-[#322F5C] bg-[#1C1A3B] px-4 py-3">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#9B8CFF]/15">
                <span className="absolute -right-0.5 -top-0.5 inline-flex h-2 w-2 animate-ping rounded-full bg-[#9B8CFF] opacity-60" />
                <span className="absolute -right-0.5 -top-0.5 inline-flex h-2 w-2 rounded-full bg-[#9B8CFF]" />
                <FaRobot className="text-[#9B8CFF]" size={16} />
              </span>
              <div>
                <p className="font-display text-sm leading-tight text-[#F4F2FA]">
                  AI Buddy
                </p>
                <p className="text-[11px] text-[#9C97BE]">
                  A supportive space, anytime.
                </p>
              </div>
            </div>

            <button
              onClick={() => setOpen(false)}
              aria-label="Close AI Buddy"
              className="text-[#6C6791] transition hover:text-[#F4F2FA]"
            >
              <FiX size={18} />
            </button>
          </div>

          <div className="min-h-0 flex-1">
            <AIChat />
          </div>
        </div>
      )}

      {/* Floating toggle button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? "Close AI Buddy" : "Open AI Buddy"}
        className="fixed bottom-5 right-4 z-[90] flex h-14 w-14 items-center justify-center rounded-full bg-[#9B8CFF] text-[#12112A] shadow-lg shadow-black/40 transition hover:bg-[#8577F2] sm:right-6"
      >
        {!open && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#9B8CFF] opacity-20" />
        )}
        {open ? <FiX size={22} /> : <FaRobot size={22} />}
      </button>
    </>
  );
};

export default AIChatWidget;
