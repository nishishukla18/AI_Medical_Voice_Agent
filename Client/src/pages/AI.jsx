import { FiFeather } from "react-icons/fi";
import AIChat from "../components/AIChat";

const AI = () => {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <section className="mb-6">
        <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-[#322F5C] px-3 py-1 font-mono-anon text-[11px] uppercase tracking-widest text-[#9B8CFF]">
          <FiFeather size={12} /> private & judgment-free
        </span>
        <h1 className="font-display text-3xl leading-tight text-[#F4F2FA] sm:text-4xl">
          Talk it through with your AI Buddy.
        </h1>
        <p className="mt-2 text-[#9C97BE]">
          Type or speak — it's just between you and the AI.
        </p>
      </section>

      <div className="h-[65vh] min-h-[480px] overflow-hidden rounded-2xl border border-[#322F5C] bg-[#1C1A3B] shadow-lg shadow-black/20">
        <AIChat />
      </div>
    </div>
  );
};

export default AI;
