import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import AIChatWidget from "./components/AIChatWidget";

import Landing from "./pages/Landing";
import Community from "./pages/Community";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
import AI from "./pages/AI";
import Profile from "./pages/Profile";

import { useAuth } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";


const ProtectedRoute = ({ children }) => {

  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-[#9C97BE]">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};


function App() {

  const { user } = useAuth();

  return (
    <ToastProvider>

      <Navbar />

      <main className="min-h-[calc(100vh-57px)] bg-[#12112A]">

        <Routes>

          <Route
            path="/"
            element={<Landing />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />


          {/* COMMUNITY + CHAT */}
          <Route
            path="/community"
            element={
              <ProtectedRoute>
                <Community />
              </ProtectedRoute>
            }
          />


          {/* OPTIONAL: CHAT AS INDIVIDUAL PAGE */}
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            }
          />


          <Route
            path="/ai"
            element={
              <ProtectedRoute>
                <AI />
              </ProtectedRoute>
            }
          />


          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

        </Routes>

      </main>

      {user && <AIChatWidget />}

    </ToastProvider>
  );
}

export default App;