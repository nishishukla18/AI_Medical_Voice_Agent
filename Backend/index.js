import express from "express";
import cors from "cors";
import "dotenv/config";
import aiRoutes from "./routes/aiRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import cron from "node-cron";
import sql from "./configs/db.js";
import { createServer } from "http";
import { Server } from "socket.io";
import communitySocket from "./controllers/communityController.js";

const port = 5000;
const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173", // frontend dev server
    methods: ["GET", "POST"]
  }
});

app.use(express.json());
app.use(cors());

// Public endpoint
app.get("/", (req, res) => {
  res.send("API working");
});

// API routes
app.use("/api/ai", aiRoutes);
app.use("/api/messages", messageRoutes);

// Cleanup job: delete messages older than 5 days
cron.schedule("0 0 * * *", async () => {
  await sql`DELETE FROM messages WHERE created_at < NOW() - INTERVAL '5 days'`;
  console.log("Old messages cleaned up");
});

// Attach Socket.IO community controller
communitySocket(io);

httpServer.listen(port, () => {
  console.log(`Server running on ${port}`);
});
