import { useNavigate } from "react-router-dom";
import { FiArrowRight, FiUsers, FiMessageCircle, FiFeather } from "react-icons/fi";
import { FaRobot } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import Footer from "../components/Footer";

const features = [
  {
    icon: FiUsers,
    title: "Anonymous Community",
    text: "Post your thoughts and read others' — no names, no profiles, no judgment.",
  },
  {
    icon: FiMessageCircle,
    title: "Live Anonymous Chat",
    text: "Talk with the community in real time, still completely anonymous.",
  },
  {
    icon: FaRobot,
    title: "AI Buddy",
    text: "A supportive AI that listens, responds, and gently tracks how you're feeling.",
  },
];

const Landing = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate(user ? "/profile" : "/login");
  };

  return (
    <div className="bg-[#12112A]">
      {/* HERO */}
      <section className="relative flex min-h-[calc(100vh-57px)] items-center justify-center overflow-hidden px-4">
        {/* Background image — replace with your actual filename in /public */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/heroImg.jpg')" }}
        />
        {/* Transparent color overlay so text stays readable and theme stays consistent */}
        <div className="absolute inset-0 bg-[#12112A]/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#12112A] via-[#12112A]/60 to-[#12112A]/30" />

        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <span className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-[#322F5C] bg-[#1C1A3B]/60 px-3 py-1 font-mono-anon text-[11px] uppercase tracking-widest text-[#9B8CFF] backdrop-blur-sm">
            <FiFeather size={12} /> anonymous & unfiltered
          </span>

          <h1 className="font-display text-4xl leading-tight text-[#F4F2FA] sm:text-5xl">
            Say what you can't say out loud.
          </h1>

          <p className="mx-auto mt-4 max-w-lg text-[#C9C5E0]">
            Whisper is a quiet space to share your thoughts, talk to others,
            and check in with an AI buddy — without ever revealing who you
            are.
          </p>

          <button
            onClick={handleGetStarted}
            className="mx-auto mt-8 flex items-center gap-2 rounded-full bg-[#9B8CFF] px-6 py-3 text-sm font-medium text-[#12112A] transition hover:bg-[#8577F2]"
          >
            Get Started <FiArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* ABOUT / FEATURES */}
      <section className="relative overflow-hidden px-4 py-20">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: "url('/hero-bg-2.jpg')" }}
        />
        <div className="absolute inset-0 bg-[#12112A]/90" />

        <div className="relative z-10 mx-auto max-w-5xl">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="font-display text-3xl text-[#F4F2FA]">
              A space built entirely around your privacy.
            </h2>
            <p className="mt-3 text-[#9C97BE]">
              No real names. No public profiles. Every voice here is
              represented by a generated identity, not a person — so you can
              speak freely.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            {features.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="rounded-2xl border border-[#322F5C] bg-[#1C1A3B] p-6 transition hover:border-[#423d78]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#9B8CFF]/15 text-[#9B8CFF]">
                  <Icon size={18} />
                </div>
                <h3 className="mt-4 font-display text-lg text-[#F4F2FA]">
                  {title}
                </h3>
                <p className="mt-1.5 text-sm text-[#9C97BE]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;
