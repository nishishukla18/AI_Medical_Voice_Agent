import Home from "./Home";
import Chat from "./Chat";

const Community = () => {
  return (
    <div className="relative min-h-[calc(100vh-57px)] overflow-hidden">

      {/* BACKGROUND IMAGE */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: "url('/bgImg2.jpg')",
        }}
      />

      {/* DARK OVERLAY */}
      <div className="fixed inset-0 bg-[#12112A]/80" />

      {/* GRADIENT */}
      <div
        className="
          fixed
          inset-0
          bg-gradient-to-t
          from-[#12112A]
          via-[#12112A]/70
          to-[#12112A]/40
        "
      />

      {/* CONTENT */}
      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-7xl
          px-3
          sm:px-5
          lg:px-6
        "
      >

        <div
          className="
            grid
            grid-cols-1
            gap-6
            lg:grid-cols-[minmax(0,1fr)_380px]
            lg:items-start
          "
        >

          {/* LEFT SIDE - COMMUNITY */}
          <div className="min-w-0">
            <Home />
          </div>

          {/* RIGHT SIDE - CHAT */}
          <aside
            className="
              min-w-0
              lg:sticky
              lg:top-[73px]
              lg:h-[calc(100vh-90px)]
            "
          >
            <Chat />
          </aside>

        </div>

      </div>
    </div>
  );
};

export default Community;