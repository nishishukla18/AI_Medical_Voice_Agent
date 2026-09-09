import { useState } from "react";
import { FiHeart, FiMessageCircle, FiTrash2 } from "react-icons/fi";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import CommentSection from "./CommentSection";
import AnonTag from "./AnonTag";

const PostCard = ({ post, onDelete, onLike }) => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [showComments, setShowComments] = useState(false);

  const isOwner = user?.id === post.author?._id;
  const hasLiked = post.likes?.some((id) => id === user?.id);

  const handleLike = async () => {
    try {
      const response = await api.post(`/api/posts/${post._id}/like`);
      onLike(post._id, response.data.likes);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm("Delete this post?");
    if (!confirmed) return;

    try {
      await api.delete(`/api/posts/${post._id}`);
      onDelete(post._id);
      showToast("Post deleted.", "success");
    } catch (error) {
      console.error(error);
      showToast(error.response?.data?.message || "Failed to delete post");
    }
  };

  const date = new Date(post.createdAt).toLocaleString();

  return (
    <article className="animate-fade-in-up rounded-2xl border border-[#322F5C] bg-[#1C1A3B] p-5 transition hover:border-[#423d78]">
      <div className="flex items-start justify-between">
        <div>
          <AnonTag name={post.author?.anonymousName} />
          <p className="mt-1 font-mono-anon text-xs text-[#6C6791]">{date}</p>
        </div>

        {isOwner && (
          <button
            onClick={handleDelete}
            aria-label="Delete post"
            className="text-[#6C6791] transition hover:text-[#F0917A]"
          >
            <FiTrash2 size={15} />
          </button>
        )}
      </div>

      <p className="mt-4 whitespace-pre-wrap text-[15px] leading-relaxed text-[#F4F2FA]">
        {post.content}
      </p>

      <div className="mt-4 flex items-center gap-5 border-t border-[#322F5C] pt-3">
        <button
          onClick={handleLike}
          aria-pressed={hasLiked}
          className={`flex items-center gap-1.5 text-sm transition ${
            hasLiked ? "text-[#F0917A]" : "text-[#9C97BE] hover:text-[#F0917A]"
          }`}
        >
          <FiHeart size={15} className={hasLiked ? "fill-current" : ""} />
          {post.likes?.length || 0}
        </button>

        <button
          onClick={() => setShowComments(!showComments)}
          className="relative flex items-center gap-1.5 text-sm text-[#9C97BE] transition hover:text-[#9B8CFF]"
        >
          <FiMessageCircle size={15} /> Comments
          {!showComments && post.commentsCount > 0 && (
            <span className="absolute -right-2 -top-1 h-1.5 w-1.5 rounded-full bg-[#9B8CFF]" />
          )}
        </button>
      </div>

      {showComments && (
        <div className="animate-fade-in mt-4 border-t border-[#322F5C] pt-4">
          <CommentSection postId={post._id} />
        </div>
      )}
    </article>
  );
};

export default PostCard;
