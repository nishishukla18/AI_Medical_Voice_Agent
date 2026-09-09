// import { useEffect, useRef, useState } from "react";
// import { io } from "socket.io-client";
// import {
//   FiSend,
//   FiMessageCircle,
// } from "react-icons/fi";

// import { useAuth } from "../context/AuthContext";
// import AnonTag from "../components/AnonTag";

// const Chat = () => {
//   const { user } = useAuth();

//   const [messages, setMessages] = useState([]);
//   const [content, setContent] = useState("");

//   const socketRef = useRef(null);
//   const messagesEndRef = useRef(null);

//   // Get the ID regardless of whether
//   // your backend returns _id or id
//   const userId = user?._id || user?.id;

//   useEffect(() => {
//     if (!userId) return;

//     const socket = io(
//       import.meta.env.VITE_SOCKET_URL,
//       {
//         withCredentials: true,
//       }
//     );

//     socketRef.current = socket;

//     // ==============================
//     // CONNECT
//     // ==============================

//     socket.on("connect", () => {
//       console.log("Connected to chat");

//       console.log("User:", user);
//       console.log("User ID:", userId);

//       socket.emit(
//         "joinCommunity",
//         userId
//       );
//     });

//     // ==============================
//     // CHAT HISTORY
//     // ==============================

//     socket.on(
//       "chatHistory",
//       (messages) => {
//         console.log(
//           "Chat history:",
//           messages
//         );

//         setMessages(messages);
//       }
//     );

//     // ==============================
//     // NEW MESSAGE
//     // ==============================

//     socket.on(
//       "newMessage",
//       (message) => {
//         console.log(
//           "New message:",
//           message
//         );

//         setMessages((prev) => [
//           ...prev,
//           message,
//         ]);
//       }
//     );

//     // ==============================
//     // SOCKET ERROR
//     // ==============================

//     socket.on(
//       "connect_error",
//       (error) => {
//         console.error(
//           "Socket connection error:",
//           error
//         );
//       }
//     );

//     // ==============================
//     // CLEANUP
//     // ==============================

//     return () => {
//       socket.disconnect();
//       socketRef.current = null;
//     };
//   }, [userId]);

//   // ==============================
//   // AUTO SCROLL
//   // ==============================

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({
//       behavior: "smooth",
//     });
//   }, [messages]);

//   // ==============================
//   // SEND MESSAGE
//   // ==============================

//   const sendMessage = (e) => {
//     e.preventDefault();

//     if (
//       !content.trim() ||
//       !socketRef.current
//     ) {
//       return;
//     }

//     socketRef.current.emit(
//       "sendMessage",
//       {
//         content: content.trim(),
//       }
//     );

//     setContent("");
//   };

//   return (
//     <div className="flex h-[calc(100vh-57px)] flex-col px-4">

//       {/* HEADER */}

//       <div className="flex items-center gap-2 border-b border-[#322F5C] py-4">

//         <FiMessageCircle
//           className="text-[#9B8CFF]"
//           size={20}
//         />

//         <div>

//           <h1 className="font-display text-xl text-[#F4F2FA]">
//             Community Chat
//           </h1>

//           <p className="text-sm text-[#9C97BE]">
//             Everyone is anonymous here.
//           </p>

//         </div>

//       </div>


//       {/* MESSAGES */}

//       <div className="flex-1 space-y-3 overflow-y-auto py-4">

//         {messages.length === 0 ? (

//           <div className="flex h-full flex-col items-center justify-center text-center">

//             <FiMessageCircle
//               className="mb-2 text-[#322F5C]"
//               size={28}
//             />

//             <p className="text-[#9C97BE]">
//               No messages yet.
//             </p>

//             <p className="text-sm text-[#6C6791]">
//               Start the conversation.
//             </p>

//           </div>

//         ) : (

//           messages.map(
//             (message, index) => {

//               const senderId =
//                 message.sender?._id ||
//                 message.sender?.id;

//               const isMine =
//                 senderId?.toString() ===
//                 userId?.toString();

//               return (
//                 <div
//                   key={
//                     message._id ||
//                     index
//                   }
//                   className={`animate-fade-in flex flex-col ${
//                     isMine
//                       ? "items-end"
//                       : "items-start"
//                   }`}
//                 >

//                   {/* USER NAME */}

//                   <div className="mb-1">

//                     {isMine ? (

//                       <span className="font-mono-anon text-xs text-[#6C6791]">
//                         You
//                       </span>

//                     ) : (

//                       <AnonTag
//                         name={
//                           message.sender
//                             ?.anonymousName
//                         }
//                         size="sm"
//                       />

//                     )}

//                   </div>


//                   {/* MESSAGE */}

//                   <div
//                     className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm ${
//                       isMine
//                         ? "rounded-br-sm bg-[#9B8CFF] text-[#12112A]"
//                         : "rounded-bl-sm bg-[#1C1A3B] text-[#F4F2FA]"
//                     }`}
//                   >
//                     {message.content}
//                   </div>


//                   {/* TIME */}

//                   <small className="mt-1 font-mono-anon text-[10px] text-[#6C6791]">

//                     {message.createdAt &&
//                       new Date(
//                         message.createdAt
//                       ).toLocaleTimeString()}

//                   </small>

//                 </div>
//               );
//             }
//           )

//         )}

//         <div ref={messagesEndRef} />

//       </div>


//       {/* INPUT */}

//       <form
//         onSubmit={sendMessage}
//         className="flex gap-2 border-t border-[#322F5C] py-4"
//       >

//         <input
//           type="text"
//           placeholder="Type a message..."
//           value={content}
//           onChange={(e) =>
//             setContent(e.target.value)
//           }
//           aria-label="Type a chat message"
//           className="flex-1 rounded-full border border-[#322F5C] bg-[#1C1A3B] px-4 py-2.5 text-sm text-[#F4F2FA] placeholder-[#6C6791] outline-none transition focus:border-[#9B8CFF]"
//         />

//         <button
//           type="submit"
//           aria-label="Send message"
//           className="flex items-center justify-center gap-2 rounded-full bg-[#9B8CFF] px-5 py-2.5 text-sm font-medium text-[#12112A] transition hover:bg-[#8577F2]"
//         >
//           <FiSend size={15} />
//         </button>

//       </form>

//     </div>
//   );
// };

// export default Chat;

import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import {
  FiSend,
  FiMessageCircle,
} from "react-icons/fi";

import { useAuth } from "../context/AuthContext";
import AnonTag from "../components/AnonTag";


const Chat = () => {

  const { user } = useAuth();

  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");

  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);


  useEffect(() => {

    if (!user) return;

    const socket = io(
      import.meta.env.VITE_SOCKET_URL,
      {
        withCredentials: true,
      }
    );

    socketRef.current = socket;


    socket.on("connect", () => {

      console.log("Connected to chat");

      socket.emit(
        "joinCommunity",
        user.id
      );

    });


    socket.on("newMessage", (message) => {

      setMessages((prev) => [
        ...prev,
        message,
      ]);

    });


    return () => {

      socket.disconnect();

    };

  }, [user]);


  useEffect(() => {

    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });

  }, [messages]);


  const sendMessage = (e) => {

    e.preventDefault();

    if (
      !content.trim() ||
      !socketRef.current
    ) {
      return;
    }

    socketRef.current.emit(
      "sendMessage",
      {
        content: content.trim(),
      }
    );

    setContent("");

  };


  return (
    <div
      className="
        flex
        h-[620px]
        min-h-[500px]
        w-full
        flex-col
        overflow-hidden
        rounded-2xl
        border
        border-[#322F5C]
        bg-[#15132F]/95
        shadow-2xl
        backdrop-blur-xl

        sm:h-[650px]

        lg:h-full
        lg:min-h-0
      "
    >

      {/* HEADER */}
      <div
        className="
          flex
          shrink-0
          items-center
          gap-3
          border-b
          border-[#322F5C]
          px-4
          py-4
          sm:px-5
        "
      >

        <div
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-[#9B8CFF]/15
            text-[#9B8CFF]
          "
        >
          <FiMessageCircle size={19} />
        </div>


        <div className="min-w-0">

          <h1
            className="
              font-display
              text-lg
              text-[#F4F2FA]
            "
          >
            Community Chat
          </h1>

          <div
            className="
              mt-0.5
              flex
              items-center
              gap-1.5
              text-xs
              text-[#9C97BE]
            "
          >

            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-[#B7E65C]
              "
            />

            Everyone is anonymous here.

          </div>

        </div>

      </div>


      {/* MESSAGES */}
      <div
        className="
          flex-1
          space-y-4
          overflow-y-auto
          px-3
          py-4
          sm:px-4
        "
      >

        {messages.length === 0 ? (

          <div
            className="
              flex
              h-full
              flex-col
              items-center
              justify-center
              px-5
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
                text-[#6C6791]
              "
            >
              <FiMessageCircle size={22} />
            </div>

            <p className="text-sm text-[#9C97BE]">
              No messages yet.
            </p>

            <p className="mt-1 text-xs text-[#6C6791]">
              Start the conversation.
            </p>

          </div>

        ) : (

          messages.map((message, index) => {

            const isMine =
              message.sender?._id === user.id;


            return (
              <div
                key={
                  message._id ||
                  index
                }
                className={`
                  flex
                  animate-fade-in
                  flex-col
                  ${
                    isMine
                      ? "items-end"
                      : "items-start"
                  }
                `}
              >

                {/* USER NAME */}
                <div className="mb-1 px-1">

                  {isMine ? (

                    <span
                      className="
                        font-mono-anon
                        text-[10px]
                        uppercase
                        tracking-wider
                        text-[#6C6791]
                      "
                    >
                      You
                    </span>

                  ) : (

                    <AnonTag
                      name={
                        message.sender
                          ?.anonymousName
                      }
                      size="sm"
                    />

                  )}

                </div>


                {/* MESSAGE */}
                <div
                  className={`
                    max-w-[85%]
                    break-words
                    rounded-2xl
                    px-4
                    py-2.5
                    text-sm
                    leading-relaxed
                    sm:max-w-[80%]

                    ${
                      isMine
                        ? `
                          rounded-br-md
                          bg-[#9B8CFF]
                          text-[#12112A]
                        `
                        : `
                          rounded-bl-md
                          border
                          border-[#322F5C]
                          bg-[#1C1A3B]
                          text-[#F4F2FA]
                        `
                    }
                  `}
                >
                  {message.content}
                </div>


                {/* TIME */}
                <small
                  className="
                    mt-1
                    px-1
                    font-mono-anon
                    text-[9px]
                    text-[#6C6791]
                  "
                >
                  {new Date(
                    message.createdAt
                  ).toLocaleTimeString(
                    [],
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
                </small>

              </div>
            );

          })

        )}

        <div ref={messagesEndRef} />

      </div>


      {/* INPUT */}
      <form
        onSubmit={sendMessage}
        className="
          shrink-0
          border-t
          border-[#322F5C]
          bg-[#15132F]
          p-3
          sm:p-4
        "
      >

        <div
          className="
            flex
            items-center
            gap-2
            rounded-full
            border
            border-[#322F5C]
            bg-[#1C1A3B]
            p-1
            pl-4
            transition
            focus-within:border-[#9B8CFF]
          "
        >

          <input
            type="text"
            placeholder="Type a message..."
            value={content}
            onChange={(e) =>
              setContent(e.target.value)
            }
            aria-label="Type a chat message"
            className="
              min-w-0
              flex-1
              bg-transparent
              py-2
              text-sm
              text-[#F4F2FA]
              placeholder-[#6C6791]
              outline-none
            "
          />


          <button
            type="submit"
            disabled={!content.trim()}
            aria-label="Send message"
            className="
              flex
              h-9
              w-9
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

            <FiSend size={15} />

          </button>

        </div>

      </form>

    </div>
  );
};


export default Chat;