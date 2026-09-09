import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="border-t border-[#322F5C] bg-[#12112A]">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row">
          <div>
            <p className="font-display text-xl italic text-[#F4F2FA]">
              Whisper<span className="text-[#9B8CFF]">.</span>
            </p>
            <p className="mt-2 max-w-xs text-sm text-[#9C97BE]">
              A quiet corner of the internet to say what you can't say out
              loud — anonymously, always.
            </p>
          </div>

          <div className="flex gap-10">
            <div>
              <p className="font-mono-anon text-xs uppercase tracking-widest text-[#6C6791]">
                Product
              </p>
              <ul className="mt-3 space-y-2 text-sm text-[#9C97BE]">
                <li>
                  <Link to="/community" className="transition hover:text-[#F4F2FA]">
                    Community
                  </Link>
                </li>
                <li>
                  <Link to="/chat" className="transition hover:text-[#F4F2FA]">
                    Live Chat
                  </Link>
                </li>
                <li>
                  <Link to="/ai" className="transition hover:text-[#F4F2FA]">
                    AI Buddy
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-mono-anon text-xs uppercase tracking-widest text-[#6C6791]">
                Account
              </p>
              <ul className="mt-3 space-y-2 text-sm text-[#9C97BE]">
                <li>
                  <Link to="/login" className="transition hover:text-[#F4F2FA]">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="transition hover:text-[#F4F2FA]">
                    Register
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-[#322F5C] pt-6 text-xs text-[#6C6791] sm:flex-row">
          <span>© {new Date().getFullYear()} Whisper. All rights reserved.</span>
          <span className="flex items-center gap-1.5">
            Made with <FiHeart className="text-[#F0917A]" size={12} /> for
            honest conversations
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
