import { useState } from "react";

export default function MessageForm({ socket }) {
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    socket.emit("newMessage", content);
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2 mb-4">
      <input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Share your thoughts..."
        className="flex-1 border rounded px-3 py-2"
      />
      <button
        type="submit"
        className="bg-indigo-600 text-white px-4 py-2 rounded"
      >
        Send
      </button>
    </form>
  );
}
