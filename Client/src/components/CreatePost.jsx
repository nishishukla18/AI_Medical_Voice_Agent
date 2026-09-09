import { useState } from "react";
import { FiSend } from "react-icons/fi";
import api from "../services/api";

const CreatePost = ({ onPostCreated }) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) return;

    setLoading(true);

    try {
      const response = await api.post("/api/posts", { content });

      setContent("");
      onPostCreated(response.data.post);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-[#322F5C] bg-[#1C1A3B] p-4 shadow-lg shadow-black/20 transition focus-within:border-[#9B8CFF]/60"
    >
      <textarea
        placeholder="What's on your mind? No one will know it's you."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        maxLength={2000}
        rows={3}
        aria-label="Write a new anonymous post"
        className="w-full resize-none bg-transparent text-[15px] text-[#F4F2FA] placeholder-[#6C6791] outline-none"
      />

      <div className="mt-3 flex items-center justify-between border-t border-[#322F5C] pt-3">
        <span className="font-mono-anon text-xs text-[#6C6791]">
          {content.length}/2000
        </span>

        <button
          type="submit"
          disabled={loading || !content.trim()}
          className="flex items-center gap-2 rounded-full bg-[#9B8CFF] px-5 py-2 text-sm font-medium text-[#12112A] transition hover:bg-[#8577F2] disabled:cursor-not-allowed disabled:opacity-40"
        >
          {loading ? "Posting..." : "Post anonymously"}
          {!loading && <FiSend size={14} />}
        </button>
      </div>
    </form>
  );
};

export default CreatePost;
