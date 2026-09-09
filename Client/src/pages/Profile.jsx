import { useEffect, useState } from "react";

import {
  FiMail,
  FiLogOut,
} from "react-icons/fi";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import {
  getMoodHistory,
} from "../services/aiService";

import AnonTag from "../components/AnonTag";
import MoodCard from "../components/MoodCard";

const Profile = () => {

  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const [moods, setMoods] = useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const fetchMoodHistory = async () => {

      try {

        const data =
          await getMoodHistory();

        setMoods(data || []);

      } catch (error) {

        console.error(
          "Failed to fetch mood history:",
          error
        );

        setMoods([]);

      } finally {

        setLoading(false);

      }
    };

    fetchMoodHistory();

  }, []);

  const handleLogout = async () => {

    await logout();

    navigate("/login");

  };

   return (
    <div className="relative min-h-[calc(100vh-57px)] overflow-hidden">

      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: "url('/bg3.jpg')",
        }}
      />

      <div className="absolute inset-0 bg-[#12112A]/80" />

      <div className="absolute inset-0 bg-gradient-to-t from-[#12112A] via-[#12112A]/60 to-[#12112A]/30" />


      <div className="relative z-10 mx-auto max-w-2xl px-4 py-10">

        {/* PROFILE CARD */}

        <section
          className="
            animate-fade-in-up
            rounded-2xl
            border
            border-[#322F5C]
            bg-[#1C1A3B]/80
            p-6
            backdrop-blur-sm
          "
        >

          <div
            className="
              flex
              flex-col
              items-start
              justify-between
              gap-4
              sm:flex-row
              sm:items-center
            "
          >

            <div>

              <p
                className="
                  font-mono-anon
                  text-xs
                  uppercase
                  tracking-widest
                  text-[#6C6791]
                "
              >
                Your identity
              </p>

              <div className="mt-2">
                <AnonTag
                  name={user?.anonymousName}
                />
              </div>

              {user?.email && (
                <p
                  className="
                    mt-2
                    flex
                    items-center
                    gap-1.5
                    text-sm
                    text-[#9C97BE]
                  "
                >
                  <FiMail size={14} />

                  {user.email}
                </p>
              )}

            </div>


            <button
              onClick={handleLogout}
              className="
                flex
                items-center
                gap-1.5
                rounded-full
                border
                border-[#322F5C]
                px-4
                py-2
                text-xs
                text-[#9C97BE]
                transition
                hover:border-[#F0917A]/50
                hover:text-[#F0917A]
              "
            >

              <FiLogOut size={13} />

              Logout

            </button>

          </div>

        </section>


        {/* ============================= */}
        {/* MOOD ANALYTICS */}
        {/* ============================= */}

        <section className="mt-10">

          <h2
            className="
              mb-4
              font-mono-anon
              text-xs
              uppercase
              tracking-widest
              text-[#6C6791]
            "
          >
            Mood analytics
          </h2>


          {/* LOADING */}

          {loading ? (

            <div className="space-y-4">

              {[0, 1, 2].map((i) => (

                <div
                  key={i}
                  className="
                    h-32
                    animate-pulse
                    rounded-2xl
                    border
                    border-[#322F5C]
                    bg-[#1C1A3B]/80
                    backdrop-blur-sm
                  "
                />

              ))}

            </div>

          ) : moods.length === 0 ? (

            /* NO MOODS */

            <div
              className="
                rounded-2xl
                border
                border-dashed
                border-[#322F5C]
                bg-[#1C1A3B]/70
                p-10
                text-center
                backdrop-blur-sm
              "
            >

              <h3
                className="
                  font-display
                  text-lg
                  text-[#F4F2FA]
                "
              >
                No mood check-ins yet.
              </h3>

              <p
                className="
                  mt-1
                  text-sm
                  text-[#9C97BE]
                "
              >
                Talk to your AI Buddy and
                your mood history will show
                up here.
              </p>

            </div>

          ) : (

            /* MOOD LIST */

            <div className="space-y-4">

              {moods.map((mood) => (

                <MoodCard
                  key={mood._id}
                  mood={mood}
                />

              ))}

            </div>

          )}

        </section>

      </div>

    </div>
  );
};

export default Profile;