import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiEye, FiEyeOff, FiAlertCircle } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-57px)] items-center justify-center px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="animate-fade-in-up w-full max-w-sm rounded-2xl border border-[#322F5C] bg-[#1C1A3B] p-8 shadow-xl shadow-black/30"
      >
        <h1 className="font-display text-2xl text-[#F4F2FA]">Welcome back</h1>
        <p className="mt-1 text-sm text-[#9C97BE]">Continue anonymously.</p>

        {error && (
          <div
            role="alert"
            className="mt-4 flex items-center gap-2 rounded-lg border border-[#F0917A]/30 bg-[#F0917A]/10 px-3 py-2 text-sm text-[#F0917A]"
          >
            <FiAlertCircle className="shrink-0" size={15} />
            {error}
          </div>
        )}

        <div className="mt-6 space-y-3">
          <div className="relative">
            <FiMail
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6C6791]"
              size={16}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border border-[#322F5C] bg-[#12112A] py-2.5 pl-10 pr-4 text-sm text-[#F4F2FA] placeholder-[#6C6791] outline-none transition focus:border-[#9B8CFF]"
            />
          </div>

          <div className="relative">
            <FiLock
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6C6791]"
              size={16}
            />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg border border-[#322F5C] bg-[#12112A] py-2.5 pl-10 pr-10 text-sm text-[#F4F2FA] placeholder-[#6C6791] outline-none transition focus:border-[#9B8CFF]"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#6C6791] transition hover:text-[#9C97BE]"
            >
              {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-full bg-[#9B8CFF] py-2.5 text-sm font-medium text-[#12112A] transition hover:bg-[#8577F2] disabled:opacity-40"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="mt-5 text-center text-sm text-[#9C97BE]">
          Don't have an account?{" "}
          <Link to="/register" className="text-[#9B8CFF] hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
