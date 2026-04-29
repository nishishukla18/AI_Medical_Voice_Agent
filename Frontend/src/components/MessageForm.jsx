import { useState } from "react";
import { postMessage } from "../api";

export default function MessageForm({ onNewMessage }) {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    const newMsg = await postMessage(content);
    onNewMessage(newMsg);
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        value={content} 
        onChange={(e) => setContent(e.target.value)} 
        placeholder="Share your thoughts..." 
      />
      <button type="submit">Send</button>
    </form>
  );
}
