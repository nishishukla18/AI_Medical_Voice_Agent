export default function MessageList({ messages, socket }) {
  if (!messages.length) {
    return <p>No messages yet. Be the first to post!</p>;
  }

  return (
    <div>
      {messages.map((msg) => (
        <div
          key={msg.id}
          className="border-b pb-2 flex justify-between items-center"
        >
          <div>
            <strong>{msg.alias}</strong>: {msg.content}
          </div>
          <div className="space-x-2">
            <button
              onClick={() => socket.emit("likeMessage", msg.id)}
              className="text-green-600"
            >
              👍 {msg.likes}
            </button>
            <button
              onClick={() => socket.emit("dislikeMessage", msg.id)}
              className="text-red-600"
            >
              👎 {msg.dislikes}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
