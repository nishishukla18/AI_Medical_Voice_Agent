// import React, { useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";

// function VoiceCall() {
//   const [listening, setListening] = useState(false);
//   const [language, setLanguage] = useState("en-US"); // default English
//   const [userText, setUserText] = useState("");
//   const [aiResponse, setAiResponse] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [sessionMessages, setSessionMessages] = useState([]);

//   const audioRef = useRef(null);

//   const navigate = useNavigate();

//   const startListening = () => {
//   if (!("webkitSpeechRecognition" in window)) {
//     alert("Speech recognition not supported");
//     return;
//   }

//   const recognition = new window.webkitSpeechRecognition();
//   recognition.lang = language; // 🔥 dynamic
//   recognition.interimResults = false;
//   recognition.continuous = false;

//   setListening(true);
//   recognition.start();

//   recognition.onresult = async (event) => {
//     const text = event.results[0][0].transcript;
//     setUserText(text);
//     setListening(false);
//     await sendToAI(text, language);
//   };

//   recognition.onerror = () => {
//     setListening(false);
//     alert("Speech recognition error");
//   };
// };
//   // 📩 Send user query to backend

// const sendToAI = async (text, lang) => {
//   try {
//     setLoading(true);
//     const res = await fetch("http://localhost:5000/api/ai/ask", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         query: text,
//         language: lang === "hi-IN" ? "Hindi" : "English",
//       }),
//     });

//     const data = await res.json();
//     setAiResponse(data.reply);
//     speak(data.reply, lang);
//   } catch (err) {
//     setAiResponse("⚠️ AI service error");
//   } finally {
//     setLoading(false);
//   }
// };

// const speak = (text, lang) => {
//   const utter = new SpeechSynthesisUtterance(text);
//   utter.lang = lang; // 🔥 SAME language
//   utter.rate = 0.95;
//   utter.pitch = 1;

//   window.speechSynthesis.cancel();
//   window.speechSynthesis.speak(utter);
// };

// //End call handler

// const endCall = ()=>{
//   //stop speech
//   window.speechSynthesis.cancel();
//    // stop listening state
//   setListening(false);
//   // optional: clear mic state
//   setLoading(false);
//   navigate("/history")
// }


//   // ⏸ Pause speech
//   const pauseSpeech = () => {
//     if (window.speechSynthesis.speaking) {
//       window.speechSynthesis.cancel(); // stops immediately
//     }
//   };

//   return (
//     <div className="p-6 max-w-lg mx-auto text-center">
//       <h1 className="text-3xl font-bold mb-6">🩺 Voice Medical Assistant</h1>

//     <div className="mb-4 flex justify-center gap-4">
//   <button
//     onClick={() => setLanguage("en-US")}
//     className={`px-4 py-2 rounded ${
//       language === "en-US" ? "bg-green-600 text-white" : "bg-gray-300"
//     }`}
//   >
//     English
//   </button>

//   <button
//     onClick={() => setLanguage("hi-IN")}
//     className={`px-4 py-2 rounded ${
//       language === "hi-IN" ? "bg-green-600 text-white" : "bg-gray-300"
//     }`}
//   >
//     हिंदी
//   </button>
// </div>


//       {/* Microphone Button */}
//       <button
//         onClick={startListening}
//         disabled={listening || loading}
//         className={`px-6 py-3 text-white rounded-full text-lg transition ${
//           listening ? "bg-red-600 animate-pulse" : "bg-blue-600 hover:bg-blue-700"
//         } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
//       >
//         {listening ? "Listening…" : loading ? "Processing…" : "🎤 Start Talking"}
//       </button>

//       {/* Pause Button */}
//       <button
//         onClick={pauseSpeech}
//         className="ml-4 px-6 py-3 bg-gray-600 text-white rounded-full text-lg hover:bg-gray-700"
//       >
//         ⏸ Pause
//       </button>

//       {/* Conversation Box */}
//       <div className="mt-6 bg-gray-100 p-6 rounded-lg text-left shadow">
//         <h2 className="text-xl font-semibold mb-2">👤 User</h2>
//         <p className="mb-4">{userText || "—"}</p>

//         <h2 className="text-xl font-semibold mb-2">🤖 AI Doctor</h2>
//         <div className="space-y-2">
//           {/* Split AI response into headings/subheadings */}
//           {aiResponse
//             ? aiResponse.split("\n").map((line, idx) => (
//                 <p
//                   key={idx}
//                   className={
//                     line.startsWith("#")
//                       ? "text-lg font-bold"
//                       : line.startsWith("##")
//                       ? "text-md font-semibold ml-2"
//                       : "ml-4"
//                   }
//                 >
//                   {line.replace(/^#+\s*/, "")}
//                 </p>
//               ))
//             : "—"}
//         </div>
//                 {/* 🔴 End Call Button */}
// <button
//   onClick={endCall}
//   className="top-6 right-6 bg-red-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-red-700 transition"
// >
//   ❌ End Call
// </button>
//       </div>
//     </div>
//   );
// }

// export default VoiceCall;


import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;
function VoiceCall() {
  const [listening, setListening] = useState(false);
  const [language, setLanguage] = useState("en-US");
  const [userText, setUserText] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [loading, setLoading] = useState(false);

  // 🧠 store full session
  const [sessionMessages, setSessionMessages] = useState([]);

  const audioRef = useRef(null);
  const navigate = useNavigate();

  /* =======================
     🎤 SPEECH RECOGNITION
  ======================= */
  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech recognition not supported");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = language;
    recognition.interimResults = false;
    recognition.continuous = false;

    setListening(true);
    recognition.start();

    recognition.onresult = async (event) => {
      const text = event.results[0][0].transcript;
      setUserText(text);
      setListening(false);
      await sendToAI(text, language);
    };

    recognition.onerror = () => {
      setListening(false);
      alert("Speech recognition error");
    };
  };

  /* =======================
     📩 SEND TO AI
  ======================= */
  const sendToAI = async (text, lang) => {
    try {
      setLoading(true);

      const res = await fetch(`${BASE_URL}/api/ai/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: text,
          language: lang === "hi-IN" ? "Hindi" : "English",
        }),
      });

      const data = await res.json();
      setAiResponse(data.reply);
      speak(data.reply, lang);

      // 🧠 STORE TURN IN SESSION
      setSessionMessages((prev) => [
        ...prev,
        { user: text, ai: data.reply },
      ]);
    } catch {
      setAiResponse("⚠️ AI service error");
    } finally {
      setLoading(false);
    }
  };

  /* =======================
     🔊 SPEAK RESPONSE
  ======================= */
  const speak = (text, lang) => {
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = lang;
    utter.rate = 0.95;
    utter.pitch = 1;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  };

  /* =======================
     ⏸ PAUSE SPEECH
  ======================= */
  const pauseSpeech = () => {
    window.speechSynthesis.cancel();
  };

  /* =======================
     ❌ END CALL (SESSION)
  ======================= */
  const endCall = async () => {
    window.speechSynthesis.cancel();
    setListening(false);
    setLoading(false);

    try {
      await fetch(`${BASE_URL}/api/ai/end-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionMessages }),
      });
    } catch (err) {
      console.error("Failed to save session");
    }

    navigate("/history");
  };

  return (
    <div className="p-6 max-w-lg mx-auto text-center relative">
      <h1 className="text-3xl font-bold mb-6">
        🩺 Voice Medical Assistant
      </h1>

      {/* 🌐 Language Toggle */}
      <div className="mb-4 flex justify-center gap-4">
        <button
          onClick={() => setLanguage("en-US")}
          className={`px-4 py-2 rounded ${
            language === "en-US"
              ? "bg-green-600 text-white"
              : "bg-gray-300"
          }`}
        >
          English
        </button>

        <button
          onClick={() => setLanguage("hi-IN")}
          className={`px-4 py-2 rounded ${
            language === "hi-IN"
              ? "bg-green-600 text-white"
              : "bg-gray-300"
          }`}
        >
          हिंदी
        </button>
      </div>

      {/* 🎤 Mic Button */}
      <button
        onClick={startListening}
        disabled={listening || loading}
        className={`px-6 py-3 text-white rounded-full text-lg transition ${
          listening
            ? "bg-red-600 animate-pulse"
            : "bg-blue-600 hover:bg-blue-700"
        } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {listening ? "Listening…" : loading ? "Processing…" : "🎤 Start Talking"}
      </button>

      {/* ⏸ Pause */}
      <button
        onClick={pauseSpeech}
        className="ml-4 px-6 py-3 bg-gray-600 text-white rounded-full text-lg hover:bg-gray-700"
      >
        ⏸ Pause
      </button>

      {/* 💬 Conversation */}
      <div className="mt-6 bg-gray-100 p-6 rounded-lg text-left shadow">
        <h2 className="text-xl font-semibold mb-2">👤 User</h2>
        <p className="mb-4">{userText || "—"}</p>

        <h2 className="text-xl font-semibold mb-2">🤖 AI Doctor</h2>
        <div className="space-y-2">
          {aiResponse
            ? aiResponse.split("\n").map((line, idx) => (
                <p key={idx} className="ml-4">
                  {line}
                </p>
              ))
            : "—"}
        </div>
      </div>

      {/* 🔴 END CALL BUTTON (FIXED) */}
      <button
        onClick={endCall}
        className="fixed bottom-6 right-6 bg-red-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-red-700 transition"
      >
        ❌ End Call
      </button>
    </div>
  );
}

export default VoiceCall;
