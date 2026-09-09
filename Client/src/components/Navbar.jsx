import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { FiMenu, FiX, FiLogOut, FiUsers, FiUser } from "react-icons/fi";

import { FaRobot } from "react-icons/fa";

import { useAuth } from "../context/AuthContext";
import AnonTag from "./AnonTag";

const Navbar = () => {
  const { user, logout } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();

    setMenuOpen(false);

    navigate("/login");
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav
      className="
        sticky
        top-0
        z-50
        border-b
        border-[#322F5C]/80
        bg-[#12112A]/90
        backdrop-blur-xl
      "
    >
      <div
        className="
          mx-auto
          flex
          h-[57px]
          w-full
          items-center
          justify-between
          px-4
          sm:px-6
        "
      >
        {/* ================================= */}
        {/* LOGO - FAR LEFT */}
        {/* ================================= */}

        <Link
          to={user ? "/community" : "/"}
          onClick={() => setMenuOpen(false)}
          className="
            shrink-0
            font-display
            text-[22px]
            font-semibold
            italic
            tracking-tight
            text-[#F4F2FA]
            transition
            hover:text-white
          "
        >
          EmpathAI
          <span className="text-[#9B8CFF]">.</span>
        </Link>

        {/* ================================= */}
        {/* DESKTOP NAVIGATION */}
        {/* ================================= */}

        {user && (
          <div
            className="
              hidden
              items-center
              gap-1
              sm:flex
            "
          >
            {/* COMMUNITY */}

            <Link
              to="/community"
              className={`
                flex
                items-center
                gap-2
                rounded-full
                px-4
                py-2
                text-sm
                transition
                ${
                  isActive("/community")
                    ? "bg-[#1C1A3B] text-[#F4F2FA]"
                    : "text-[#9C97BE] hover:bg-[#1C1A3B]/70 hover:text-[#F4F2FA]"
                }
              `}
            >
              <FiUsers size={15} />
              Community
            </Link>

            {/* AI */}

            <Link
              to="/ai"
              className={`
                flex
                items-center
                gap-2
                rounded-full
                px-4
                py-2
                text-sm
                transition
                ${
                  isActive("/ai")
                    ? "bg-[#1C1A3B] text-[#F4F2FA]"
                    : "text-[#9C97BE] hover:bg-[#1C1A3B]/70 hover:text-[#F4F2FA]"
                }
              `}
            >
              <FaRobot size={14} />
              AI Buddy
            </Link>

            {/* DIVIDER */}

            <div className="mx-3 h-5 w-px bg-[#322F5C]" />

            {/* PROFILE */}

            <Link
              to="/profile"
              className="
                rounded-full
                transition
                hover:opacity-80
              "
            >
              <AnonTag name={user.anonymousName} size="sm" />
            </Link>

            {/* LOGOUT */}

            <button
              onClick={handleLogout}
              aria-label="Logout"
              className="
                ml-2
                flex
                items-center
                gap-1.5
                rounded-full
                border
                border-[#322F5C]
                px-3
                py-1.5
                text-xs
                text-[#9C97BE]
                transition
                hover:border-[#F0917A]/50
                hover:bg-[#F0917A]/5
                hover:text-[#F0917A]
              "
            >
              <FiLogOut size={13} />
              Logout
            </button>
          </div>
        )}

        {/* ================================= */}
        {/* MOBILE MENU BUTTON */}
        {/* ================================= */}

        {user && (
          <button
            className="
              rounded-lg
              p-2
              text-[#F4F2FA]
              transition
              hover:bg-[#1C1A3B]
              sm:hidden
            "
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        )}

        {/* ================================= */}
        {/* LOGGED OUT */}
        {/* ================================= */}

        {!user && (
          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="
                rounded-full
                px-4
                py-2
                text-sm
                text-[#9C97BE]
                transition
                hover:text-[#F4F2FA]
              "
            >
              Login
            </Link>

            <Link
              to="/register"
              className="
                rounded-full
                bg-[#9B8CFF]
                px-4
                py-2
                text-sm
                font-medium
                text-[#12112A]
                transition
                hover:bg-[#8577F2]
              "
            >
              Register
            </Link>
          </div>
        )}
      </div>

      {/* ================================= */}
      {/* MOBILE MENU */}
      {/* ================================= */}

      {user && menuOpen && (
        <div
          className="
            animate-fade-in
            border-t
            border-[#322F5C]
            bg-[#12112A]
            px-4
            py-3
            sm:hidden
          "
        >
          {/* PROFILE */}

          <Link
            to="/profile"
            onClick={() => setMenuOpen(false)}
            className="
              mb-2
              flex
              items-center
              justify-between
              rounded-xl
              border
              border-[#322F5C]
              bg-[#1C1A3B]/50
              px-3
              py-3
            "
          >
            <AnonTag name={user.anonymousName} size="sm" />

            <FiUser className="text-[#6C6791]" size={15} />
          </Link>

          {/* COMMUNITY */}

          <Link
            to="/community"
            onClick={() => setMenuOpen(false)}
            className={`
              flex
              items-center
              gap-3
              rounded-xl
              px-3
              py-3
              text-sm
              transition
              ${
                isActive("/community")
                  ? "bg-[#1C1A3B] text-[#F4F2FA]"
                  : "text-[#D9D5EC] hover:bg-[#1C1A3B]"
              }
            `}
          >
            <FiUsers size={17} />
            Community
          </Link>

          {/* AI */}

          <Link
            to="/ai"
            onClick={() => setMenuOpen(false)}
            className={`
              flex
              items-center
              gap-3
              rounded-xl
              px-3
              py-3
              text-sm
              transition
              ${
                isActive("/ai")
                  ? "bg-[#1C1A3B] text-[#F4F2FA]"
                  : "text-[#D9D5EC] hover:bg-[#1C1A3B]"
              }
            `}
          >
            <FaRobot size={16} />
            AI Buddy
          </Link>

          {/* LOGOUT */}

          <button
            onClick={handleLogout}
            className="
              mt-1
              flex
              w-full
              items-center
              gap-3
              rounded-xl
              px-3
              py-3
              text-left
              text-sm
              text-[#F0917A]
              transition
              hover:bg-[#1C1A3B]
            "
          >
            <FiLogOut size={17} />
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
