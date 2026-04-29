import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import MessageForm from "../components/MessageForm";
import MessageList from "../components/MessageList";

const socket = io("http://localhost:5000");

function Community() {
  const [messages, setMessages] = useState([]);
  const [onlineCount, setOnlineCount] = useState(0);

  useEffect(() => {
    socket.on("messageAdded", (msg) => {
      setMessages((prev) => [msg, ...prev]);
    });

    socket.on("messageUpdated", (msg) => {
      setMessages((prev) =>
        prev.map((m) => (m.id === msg.id ? msg : m))
      );
    });

    socket.on("onlineCount", (count) => {
      setOnlineCount(count);
    });

    socket.on("error", (err) => {
      alert(err);
    });

    return () => {
      socket.off("messageAdded");
      socket.off("messageUpdated");
      socket.off("onlineCount");
      socket.off("error");
    };
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 pt-24 px-4">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6 flex flex-col">
        <h1 className="text-3xl font-bold text-center mb-2 text-indigo-600">
          Community Support
        </h1>
        <p className="text-center text-gray-600 mb-4">
          Online users: {onlineCount}/5
        </p>

        <MessageForm socket={socket} />

        <hr className="my-4" />

        <div className="flex-1 max-h-[400px] overflow-y-auto space-y-3 bg-gray-50 p-4 rounded">
          <MessageList messages={messages} socket={socket} />
        </div>
      </div>
    </div>
  );
}

export default Community;
