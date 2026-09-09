import { useEffect, useState } from "react";
import { FiSend } from "react-icons/fi";
import api from "../services/api";
import AnonTag from "./AnonTag";

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchComments = async () => {
    try {
      const response = await api.get(`/api/comments/${postId}`);
      setComments(response.data.comments);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) return;

    setLoading(true);

    try {
      const response = await api.post(`/api/comments/${postId}`, { content });
      setComments((prev) => [...prev, response.data.comment]);
      setContent("");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          placeholder="Write a comment..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          aria-label="Write a comment"
          className="flex-1 rounded-full border border-[#322F5C] bg-[#12112A] px-4 py-2 text-sm text-[#F4F2FA] placeholder-[#6C6791] outline-none transition focus:border-[#9B8CFF]"
        />
        <button
          type="submit"
          disabled={loading || !content.trim()}
          aria-label="Send comment"
          className="flex items-center justify-center rounded-full bg-[#9B8CFF] px-4 py-2 text-sm font-medium text-[#12112A] transition hover:bg-[#8577F2] disabled:opacity-40"
        >
          <FiSend size={14} />
        </button>
      </form>

      <div className="space-y-3">
        {comments.length === 0 ? (
          <p className="text-sm text-[#6C6791]">No comments yet.</p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment._id}
              className="animate-fade-in rounded-xl bg-[#12112A] px-4 py-3"
            >
              <AnonTag name={comment.author?.anonymousName} size="sm" />
              <p className="mt-1.5 text-sm text-[#D9D5EC]">{comment.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;
