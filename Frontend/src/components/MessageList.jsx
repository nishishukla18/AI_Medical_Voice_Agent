export default function MessageList({ messages }) {
  if (!messages.length) {
    return <p>No messages yet. Be the first to post!</p>;
  }
  return (
    <div>
      {messages.map(msg => (
        <div key={msg.id} style={{borderBottom:"1px solid #ccc", margin:"5px"}}>
          <strong>{msg.alias}</strong>: {msg.content}
        </div>
      ))}
    </div>
  );
}
