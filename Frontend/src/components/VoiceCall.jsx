import React, { useState, useRef } from "react";

function VoiceCall() {
  const [listening, setListening] = useState(false);
  const [userText, setUserText] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const audioRef = useRef(null);

  // 🎤 Start speech recognition
  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;

    setListening(true);
    recognition.start();

    recognition.onresult = async (event) => {
      const text = event.results[0][0].transcript;
      setUserText(text);
      setListening(false);
      await sendToAI(text);
    };

    recognition.onerror = () => {
      setListening(false);
      alert("Speech recognition error. Please try again.");
    };
  };

  // 📩 Send user query to backend
  const sendToAI = async (text) => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/ai/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: text }),
      });

      const data = await res.json();
      if (data.error) {
        setAiResponse("⚠️ Error: " + data.error);
      } else {
        setAiResponse(data.reply);
        speak(data.reply);
      }
    } catch (err) {
      console.error("Error contacting AI:", err);
      setAiResponse("⚠️ Failed to contact AI service.");
    } finally {
      setLoading(false);
    }
  };

  // 🔊 Speak AI response
  const speak = (text) => {
    if (!("speechSynthesis" in window)) {
      alert("Speech synthesis not supported in this browser.");
      return;
    }

    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    utter.rate = 1;
    utter.pitch = 1;

    audioRef.current = utter;
    window.speechSynthesis.speak(utter);
  };

  // ⏸ Pause speech
  const pauseSpeech = () => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel(); // stops immediately
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto text-center">
      <h1 className="text-3xl font-bold mb-6">🩺 Voice Medical Assistant</h1>

      {/* Microphone Button */}
      <button
        onClick={startListening}
        disabled={listening || loading}
        className={`px-6 py-3 text-white rounded-full text-lg transition ${
          listening ? "bg-red-600 animate-pulse" : "bg-blue-600 hover:bg-blue-700"
        } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {listening ? "Listening…" : loading ? "Processing…" : "🎤 Start Talking"}
      </button>

      {/* Pause Button */}
      <button
        onClick={pauseSpeech}
        className="ml-4 px-6 py-3 bg-gray-600 text-white rounded-full text-lg hover:bg-gray-700"
      >
        ⏸ Pause
      </button>

      {/* Conversation Box */}
      <div className="mt-6 bg-gray-100 p-6 rounded-lg text-left shadow">
        <h2 className="text-xl font-semibold mb-2">👤 User</h2>
        <p className="mb-4">{userText || "—"}</p>

        <h2 className="text-xl font-semibold mb-2">🤖 AI Doctor</h2>
        <div className="space-y-2">
          {/* Split AI response into headings/subheadings */}
          {aiResponse
            ? aiResponse.split("\n").map((line, idx) => (
                <p
                  key={idx}
                  className={
                    line.startsWith("#")
                      ? "text-lg font-bold"
                      : line.startsWith("##")
                      ? "text-md font-semibold ml-2"
                      : "ml-4"
                  }
                >
                  {line.replace(/^#+\s*/, "")}
                </p>
              ))
            : "—"}
        </div>
      </div>
    </div>
  );
}

export default VoiceCall;
