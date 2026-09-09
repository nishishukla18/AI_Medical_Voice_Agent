// import { useEffect, useRef, useState } from "react";
// import { FiMic, FiVolume2, FiVolumeX, FiLoader, FiSend } from "react-icons/fi";
// import { askAI } from "../services/aiService";

// const moodEmoji = {
//   happy: "😊",
//   calm: "😌",
//   sad: "😔",
//   angry: "😠",
//   anxious: "😟",
//   stressed: "😣",
//   lonely: "🥺",
//   confused: "😕",
//   neutral: "😐",
//   mixed: "😶",
// };

// const AIChat = () => {
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);

//   const [loading, setLoading] = useState(false);
//   const [listening, setListening] = useState(false);
//   const [speaking, setSpeaking] = useState(false);

//   const [language, setLanguage] = useState("en-US");

//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, loading]);

//   // -----------------------------------
//   // TEXT TO SPEECH
//   // -----------------------------------

//   const speak = (text, lang) => {
//     if (!("speechSynthesis" in window)) {
//       alert("Text-to-speech is not supported in this browser.");
//       return;
//     }

//     // Stop previous speech
//     window.speechSynthesis.cancel();

//     const utterance = new SpeechSynthesisUtterance(text);

//     utterance.lang = lang;
//     utterance.rate = 0.95;
//     utterance.pitch = 0.95;

//     utterance.onstart = () => {
//       setSpeaking(true);
//     };

//     utterance.onend = () => {
//       setSpeaking(false);
//     };

//     utterance.onerror = () => {
//       setSpeaking(false);
//     };

//     window.speechSynthesis.speak(utterance);
//   };

//   // -----------------------------------
//   // STOP AI SPEECH
//   // -----------------------------------

//   const stopSpeaking = () => {
//     window.speechSynthesis.cancel();
//     setSpeaking(false);
//   };

//   // -----------------------------------
//   // SEND MESSAGE TO AI
//   // -----------------------------------

//   const sendToAI = async (text, selectedLanguage = language) => {
//     if (!text.trim() || loading) {
//       return;
//     }

//     const userMessage = text.trim();

//     setMessages((prev) => [
//       ...prev,
//       {
//         type: "user",
//         text: userMessage,
//       },
//     ]);

//     setMessage("");
//     setLoading(true);

//     try {
//       const data = await askAI(
//         userMessage,
//         selectedLanguage === "hi-IN" ? "Hindi" : "English"
//       );

//       setMessages((prev) => [
//         ...prev,
//         {
//           type: "ai",
//           text: data.reply,
//           mood: data.mood,
//         },
//       ]);

//       speak(data.reply, selectedLanguage);
//     } catch (error) {
//       console.error("AI ERROR:", error);

//       setMessages((prev) => [
//         ...prev,
//         {
//           type: "error",
//           text: "Sorry, I couldn't respond right now.",
//         },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // -----------------------------------
//   // TEXT SUBMIT
//   // -----------------------------------

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!message.trim() || loading) {
//       return;
//     }

//     await sendToAI(message);
//   };

//   // -----------------------------------
//   // SPEECH RECOGNITION
//   // -----------------------------------

//   const startListening = () => {
//     if (!("webkitSpeechRecognition" in window)) {
//       alert("Speech recognition is not supported in this browser.");
//       return;
//     }

//     if (loading) {
//       return;
//     }

//     stopSpeaking();

//     const recognition = new window.webkitSpeechRecognition();

//     recognition.lang = language;
//     recognition.interimResults = false;
//     recognition.continuous = false;

//     setListening(true);

//     recognition.start();

//     recognition.onresult = async (event) => {
//       const text = event.results[0][0].transcript;

//       setMessage(text);
//       setListening(false);

//       await sendToAI(text, language);
//     };

//     recognition.onerror = (event) => {
//       console.error("Speech recognition error:", event.error);
//       setListening(false);
//     };

//     recognition.onend = () => {
//       setListening(false);
//     };
//   };

//   return (
//     <div className="flex h-full min-h-0 flex-col">
//       {/* LANGUAGE TOGGLE */}
//       <div className="flex gap-2 border-b border-[#322F5C] px-4 py-2.5">
//         <button
//           type="button"
//           onClick={() => setLanguage("en-US")}
//           className={`rounded-full px-3 py-1 text-xs font-medium transition ${
//             language === "en-US"
//               ? "bg-[#9B8CFF] text-[#12112A]"
//               : "border border-[#322F5C] text-[#9C97BE] hover:text-[#F4F2FA]"
//           }`}
//         >
//           English
//         </button>
//         <button
//           type="button"
//           onClick={() => setLanguage("hi-IN")}
//           className={`rounded-full px-3 py-1 text-xs font-medium transition ${
//             language === "hi-IN"
//               ? "bg-[#9B8CFF] text-[#12112A]"
//               : "border border-[#322F5C] text-[#9C97BE] hover:text-[#F4F2FA]"
//           }`}
//         >
//           हिंदी
//         </button>
//       </div>

//       {/* MESSAGES */}
//       <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4">
//         {messages.length === 0 && (
//           <div className="flex h-full flex-col items-center justify-center text-center">
//             <div className="mb-2 text-3xl">🤖</div>
//             <h3 className="font-display text-base text-[#F4F2FA]">
//               How are you feeling?
//             </h3>
//             <p className="mt-1 text-sm text-[#9C97BE]">
//               You can type or speak what's on your mind.
//             </p>
//           </div>
//         )}

//         {messages.map((msg, index) => {
//           if (msg.type === "user") {
//             return (
//               <div key={index} className="animate-fade-in flex flex-col items-end">
//                 <span className="mb-1 font-mono-anon text-[10px] text-[#6C6791]">
//                   You
//                 </span>
//                 <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-[#9B8CFF] px-3.5 py-2 text-sm text-[#12112A]">
//                   {msg.text}
//                 </div>
//               </div>
//             );
//           }

//           if (msg.type === "error") {
//             return (
//               <div key={index} className="animate-fade-in flex flex-col items-start">
//                 <span className="mb-1 font-mono-anon text-[10px] text-[#F0917A]">
//                   Error
//                 </span>
//                 <div className="max-w-[85%] rounded-2xl rounded-bl-sm border border-[#F0917A]/30 bg-[#F0917A]/10 px-3.5 py-2 text-sm text-[#F0917A]">
//                   {msg.text}
//                 </div>
//               </div>
//             );
//           }

//           return (
//             <div key={index} className="animate-fade-in flex flex-col items-start">
//               <span className="mb-1 font-mono-anon text-[10px] text-[#6C6791]">
//                 AI Buddy
//               </span>
//               <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-[#12112A] px-3.5 py-2 text-sm text-[#F4F2FA]">
//                 {msg.text}
//               </div>

//               {msg.mood && (
//                 <div className="mt-2 w-[85%] rounded-xl border border-[#322F5C] bg-[#12112A] p-3">
//                   <div className="flex items-center justify-between text-xs">
//                     <span className="flex items-center gap-1.5 text-[#D9D5EC]">
//                       <span>{moodEmoji[msg.mood.mood] || "🙂"}</span>
//                       {msg.mood.mood}
//                     </span>
//                     <span className="font-mono-anon text-[#9C97BE]">
//                       {msg.mood.intensity}/10
//                     </span>
//                   </div>

//                   <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[#322F5C]">
//                     <div
//                       className="h-full rounded-full bg-[#9B8CFF] transition-all"
//                       style={{ width: `${msg.mood.intensity * 10}%` }}
//                     />
//                   </div>

//                   {msg.mood.emotions?.length > 0 && (
//                     <div className="mt-2 flex flex-wrap gap-1.5">
//                       {msg.mood.emotions.map((emotion, i) => (
//                         <span
//                           key={i}
//                           className="rounded-full border border-[#322F5C] px-2 py-0.5 font-mono-anon text-[10px] text-[#9C97BE]"
//                         >
//                           {emotion}
//                         </span>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           );
//         })}

//         {loading && (
//           <div className="flex flex-col items-start">
//             <span className="mb-1 font-mono-anon text-[10px] text-[#6C6791]">
//               AI Buddy
//             </span>
//             <div className="flex items-center gap-2 rounded-2xl rounded-bl-sm bg-[#12112A] px-3.5 py-2 text-sm text-[#9C97BE]">
//               <FiLoader className="animate-spin" size={14} />
//               Thinking...
//             </div>
//           </div>
//         )}

//         <div ref={messagesEndRef} />
//       </div>

//       {/* VOICE STATUS */}
//       {speaking && (
//         <div className="flex items-center justify-between border-t border-[#322F5C] px-4 py-2">
//           <span className="flex items-center gap-1.5 text-xs text-[#9B8CFF]">
//             <FiVolume2 size={13} /> AI is speaking
//           </span>
//           <button
//             type="button"
//             onClick={stopSpeaking}
//             className="flex items-center gap-1 text-xs text-[#F0917A] transition hover:underline"
//           >
//             <FiVolumeX size={13} /> Stop
//           </button>
//         </div>
//       )}

//       {/* INPUT ROW */}
//       <form
//         onSubmit={handleSubmit}
//         className="flex items-center gap-2 border-t border-[#322F5C] px-4 py-3"
//       >
//         <button
//           type="button"
//           onClick={startListening}
//           disabled={listening || loading}
//           aria-label={listening ? "Listening" : "Speak"}
//           className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition disabled:opacity-40 ${
//             listening
//               ? "bg-[#F0917A] text-[#12112A]"
//               : "border border-[#322F5C] text-[#9C97BE] hover:border-[#9B8CFF] hover:text-[#9B8CFF]"
//           }`}
//         >
//           {listening ? (
//             <FiLoader className="animate-spin" size={16} />
//           ) : (
//             <FiMic size={16} />
//           )}
//         </button>

//         <input
//           type="text"
//           placeholder="Share what's on your mind..."
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           disabled={loading}
//           aria-label="Message AI Buddy"
//           className="flex-1 rounded-full border border-[#322F5C] bg-[#12112A] px-4 py-2 text-sm text-[#F4F2FA] placeholder-[#6C6791] outline-none transition focus:border-[#9B8CFF] disabled:opacity-60"
//         />

//         <button
//           type="submit"
//           disabled={loading || !message.trim()}
//           aria-label="Send message"
//           className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#9B8CFF] text-[#12112A] transition hover:bg-[#8577F2] disabled:opacity-40"
//         >
//           <FiSend size={15} />
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AIChat;



import { useEffect, useRef, useState } from "react";
import {
  FiSend,
  FiVolume2,
  FiVolumeX,
  FiMic,
  FiMicOff,
} from "react-icons/fi";
import api from "../services/api";

const AIChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Voice states
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Voice language
  const [voiceLanguage, setVoiceLanguage] = useState("en-IN");

  const messagesEndRef = useRef(null);
  const audioRef = useRef(null);
  const recognitionRef = useRef(null);

  // ==========================================
  // AUTO SCROLL
  // ==========================================

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  // ==========================================
  // SPEECH RECOGNITION
  // ==========================================

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.warn(
        "Speech recognition is not supported in this browser."
      );
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.lang = voiceLanguage;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      let transcript = "";

      for (
        let i = event.resultIndex;
        i < event.results.length;
        i++
      ) {
        transcript += event.results[i][0].transcript;
      }

      setInput(transcript);
    };

    recognition.onerror = (event) => {
      console.error(
        "Speech recognition error:",
        event.error
      );

      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
  }, [voiceLanguage]);

  // ==========================================
  // START / STOP VOICE INPUT
  // ==========================================

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert(
        "Voice input is not supported in this browser. Please use Google Chrome."
      );
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    try {
      // Make sure the latest language is used
      recognitionRef.current.lang = voiceLanguage;

      recognitionRef.current.start();
    } catch (error) {
      console.error(
        "Could not start speech recognition:",
        error
      );
    }
  };

  // ==========================================
  // PLAY AI AUDIO
  // ==========================================

  const playAudio = (audioData) => {
    if (!audioData) return;

    try {
      // Stop previous audio
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }

      const audioUrl =
        `data:${audioData.type};base64,${audioData.data}`;

      const audio = new Audio(audioUrl);

      audioRef.current = audio;

      audio.onplay = () => {
        setIsSpeaking(true);
      };

      audio.onended = () => {
        setIsSpeaking(false);
        audioRef.current = null;
      };

      audio.onerror = (error) => {
        console.error(
          "Audio playback failed:",
          error
        );

        setIsSpeaking(false);
        audioRef.current = null;
      };

      audio.play().catch((error) => {
        console.error(
          "Unable to play audio:",
          error
        );

        setIsSpeaking(false);
      });
    } catch (error) {
      console.error(
        "Audio error:",
        error
      );

      setIsSpeaking(false);
    }
  };

  // ==========================================
  // SEND MESSAGE
  // ==========================================

  const sendMessage = async (e) => {
    e?.preventDefault();

    if (!input.trim() || loading) {
      return;
    }

    const userMessage = input.trim();

    // Stop listening
    if (
      isListening &&
      recognitionRef.current
    ) {
      recognitionRef.current.stop();
      setIsListening(false);
    }

    setInput("");

    // Show user message immediately
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: userMessage,
      },
    ]);

    setLoading(true);

    try {
      const response = await api.post(
        "/api/ai/chat",
        {
          query: userMessage,

          // IMPORTANT:
          // Let Gemini detect the language
          language: "auto",
        }
      );

      const data = response.data;

      // Add AI response
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: data.reply,
          mood: data.mood,
          language: data.language,
        },
      ]);

      // Play AI voice
      if (data.audio) {
        playAudio(data.audio);
      }
    } catch (error) {
      console.error(
        "AI CHAT ERROR:",
        error
      );

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content:
            "I'm sorry, I couldn't respond right now. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // STOP AI SPEAKING
  // ==========================================

  const stopSpeaking = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }

    setIsSpeaking(false);
  };

  // ==========================================
  // ENTER KEY
  // ==========================================

  const handleKeyDown = (e) => {
    if (
      e.key === "Enter" &&
      !e.shiftKey
    ) {
      e.preventDefault();
      sendMessage(e);
    }
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="flex h-full flex-col">

      {/* ================================= */}
      {/* HEADER */}
      {/* ================================= */}

      <div className="border-b border-[#322F5C] px-4 py-4">

        <div className="flex items-center justify-between">

          <div>
            <h2 className="font-display text-lg text-[#F4F2FA]">
              AI Buddy
            </h2>

            <p className="text-xs text-[#9C97BE]">
              A safe space to talk.
            </p>
          </div>

          {isSpeaking && (
            <button
              onClick={stopSpeaking}
              className="
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
                hover:text-[#F4F2FA]
              "
            >
              <FiVolumeX size={14} />
              Stop
            </button>
          )}

        </div>

      </div>

      {/* ================================= */}
      {/* MESSAGES */}
      {/* ================================= */}

      <div
        className="
          flex-1
          space-y-4
          overflow-y-auto
          px-4
          py-5
        "
      >

        {messages.length === 0 && (
          <div
            className="
              flex
              h-full
              flex-col
              items-center
              justify-center
              text-center
            "
          >

            <div
              className="
                mb-3
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                bg-[#1C1A3B]
                text-[#9B8CFF]
              "
            >
              <FiVolume2 size={22} />
            </div>

            <p
              className="
                font-display
                text-lg
                text-[#F4F2FA]
              "
            >
              Talk to your AI Buddy
            </p>

            <p
              className="
                mt-1
                max-w-xs
                text-sm
                text-[#9C97BE]
              "
            >
              Type or speak what's on your mind.
              I'm here to listen.
            </p>

          </div>
        )}

        {/* Messages */}

        {messages.map(
          (message, index) => (

            <div
              key={index}
              className={`
                flex
                ${
                  message.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }
              `}
            >

              <div
                className={`
                  max-w-[85%]
                  rounded-2xl
                  px-4
                  py-3
                  text-sm
                  leading-relaxed
                  ${
                    message.role === "user"
                      ? "rounded-br-sm bg-[#9B8CFF] text-[#12112A]"
                      : "rounded-bl-sm bg-[#1C1A3B] text-[#F4F2FA]"
                  }
                `}
              >

                {message.content}

                {/* Mood */}

                {message.role === "ai" &&
                  message.mood && (

                    <div
                      className="
                        mt-2
                        text-[10px]
                        text-[#6C6791]
                      "
                    >
                      Mood:{" "}
                      {message.mood.mood}
                    </div>

                  )}

              </div>

            </div>

          )
        )}

        {/* Loading */}

        {loading && (
          <div className="flex justify-start">

            <div
              className="
                flex
                items-center
                gap-2
                rounded-2xl
                rounded-bl-sm
                bg-[#1C1A3B]
                px-4
                py-3
                text-sm
                text-[#6C6791]
              "
            >

              <span>Thinking</span>

              <span className="animate-pulse">
                ...
              </span>

            </div>

          </div>
        )}

        <div ref={messagesEndRef} />

      </div>

      {/* ================================= */}
      {/* INPUT */}
      {/* ================================= */}

      <form
        onSubmit={sendMessage}
        className="
          border-t
          border-[#322F5C]
          p-4
        "
      >

        {/* Language selector */}

        <div className="mb-2 flex justify-end">

          <select
            value={voiceLanguage}
            onChange={(e) =>
              setVoiceLanguage(e.target.value)
            }
            disabled={loading || isListening}
            className="
              rounded-full
              border
              border-[#322F5C]
              bg-[#1C1A3B]
              px-3
              py-1
              text-xs
              text-[#9C97BE]
              outline-none
              focus:border-[#9B8CFF]
            "
          >

            <option value="en-IN">
              English
            </option>

            <option value="hi-IN">
              Hindi
            </option>

          </select>

        </div>

        <div className="flex gap-2">

          {/* Input */}

          <input
            type="text"
            value={input}
            onChange={(e) =>
              setInput(e.target.value)
            }
            onKeyDown={handleKeyDown}
            placeholder={
              isListening
                ? "Listening..."
                : "Tell me what's on your mind..."
            }
            disabled={loading}
            className="
              min-w-0
              flex-1
              rounded-full
              border
              border-[#322F5C]
              bg-[#1C1A3B]
              px-4
              py-3
              text-sm
              text-[#F4F2FA]
              outline-none
              placeholder:text-[#6C6791]
              focus:border-[#9B8CFF]
            "
          />

          {/* Microphone */}

          <button
            type="button"
            onClick={toggleListening}
            disabled={loading}
            aria-label={
              isListening
                ? "Stop listening"
                : "Start voice input"
            }
            className={`
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-full
              border
              transition
              ${
                isListening
                  ? "border-[#F0917A] bg-[#F0917A]/20 text-[#F0917A]"
                  : "border-[#322F5C] bg-[#1C1A3B] text-[#9C97BE] hover:text-[#F4F2FA]"
              }
              disabled:cursor-not-allowed
              disabled:opacity-40
            `}
          >

            {isListening ? (
              <FiMicOff size={17} />
            ) : (
              <FiMic size={17} />
            )}

          </button>

          {/* Send */}

          <button
            type="submit"
            disabled={
              loading ||
              !input.trim()
            }
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-[#9B8CFF]
              text-[#12112A]
              transition
              hover:bg-[#8577F2]
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
          >

            <FiSend size={16} />

          </button>

        </div>

      </form>

    </div>
  );
};

export default AIChat;