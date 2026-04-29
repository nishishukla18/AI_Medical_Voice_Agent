import React, { useState, useEffect } from "react";
import MessageForm from "../components/MessageForm";
import MessageList from "../components/MessageList";
import { fetchMessages } from "../api";

function Community() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await fetchMessages();
      setMessages(data);
    };
    load();

    const interval = setInterval(load, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleNewMessage = (msg) => {
    setMessages((prev) => [msg, ...prev]);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 pt-24 px-4">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6 flex flex-col">
        <h1 className="text-3xl font-bold text-center mb-6 text-indigo-600">
          Community Support
        </h1>

        {/* Message input box */}
        <MessageForm onNewMessage={handleNewMessage} />

        {/* Divider */}
        <hr className="my-4" />

        {/* Message list */}
        <div className="flex-1 max-h-[400px] overflow-y-auto space-y-3 bg-gray-50 p-4 rounded">
          <MessageList messages={messages} />
        </div>
      </div>
    </div>
  );
}

export default Community;
