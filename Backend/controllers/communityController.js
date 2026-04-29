import sql from "../configs/db.js";

let connectedUsers = 0;

export default function communitySocket(io) {
  io.on("connection", (socket) => {
    if (connectedUsers >= 5) {
      socket.emit("error", "Community is full (max 5 users).");
      socket.disconnect();
      return;
    }

    connectedUsers++;
    io.emit("onlineCount", connectedUsers);

    socket.on("newMessage", async (content) => {
      const alias = "Anon_" + Math.floor(Math.random() * 1000);
      const rows = await sql`
        INSERT INTO messages (alias, content) VALUES (${alias}, ${content}) RETURNING *
      `;
      io.emit("messageAdded", rows[0]);
    });

    socket.on("likeMessage", async (id) => {
      const rows = await sql`
        UPDATE messages SET likes = COALESCE(likes,0) + 1 WHERE id=${id} RETURNING *
      `;
      io.emit("messageUpdated", rows[0]);
    });

    socket.on("dislikeMessage", async (id) => {
      const rows = await sql`
        UPDATE messages SET dislikes = COALESCE(dislikes,0) + 1 WHERE id=${id} RETURNING *
      `;
      io.emit("messageUpdated", rows[0]);
    });

    socket.on("disconnect", () => {
      connectedUsers--;
      io.emit("onlineCount", connectedUsers);
    });
  });
}
