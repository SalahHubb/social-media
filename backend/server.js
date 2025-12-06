import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { connectToDB } from "./config/db.js";
import Message from "./models/messageSchema.js";
import { clerkMiddleware } from "@clerk/express";
import webhookRouter from "./routes/webhookRoute.js";
import postRouter from "./routes/postRoute.js";
import storyRouter from "./routes/storyRoute.js";
import userRouter from "./routes/userRoute.js";
import messageRouter from "./routes/messageRoute.js";
import connectionRouter from "./routes/connectionRoute.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:5173", methods: ["GET", "POST"] },
});
const PORT = process.env.PORT;
connectToDB();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // allow sending of cookies
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(clerkMiddleware());

// we can protect route using require middleware of clerk
app.get("/", (req, res) => {
  return res.send("Hello from server..");
});
app.use("/api/webhooks", webhookRouter);
app.use("/api/user", userRouter);
app.use("/api/story", storyRouter);
app.use("/api/post", postRouter);
app.use("/api/message", messageRouter);
app.use("/api/connection", connectionRouter);
app.use("/api/connection", connectionRouter);

// --- SOCKET.IO REAL-TIME LOGIC ---
const onlineUsers = new Map(); // clerkId -> socketId

io.on("connection", (socket) => {
  // 1. map the user id with its corresponding socket.id on joining room
  socket.on("join", (clerkId) => {
    console.log("user: " + clerkId + "is online");
    onlineUsers.set(clerkId, socket.id);
  });

  // 2. private message
  socket.on("privateMessage", async ({ senderId, recipientId, content }) => {
    try {
      console.log("senderId: ", senderId);
      console.log("senderId: ", recipientId);
      console.log("content: ", content);

      // save to db
      const newMessage = await Message.create({
        senderId,
        recipientId,
        content,
      });

      // send to recipient if online
      const recipientSocketId = onlineUsers.get(recipientId);
      if (recipientSocketId) {
        io.to(recipientSocketId).emit("receiveMessage", newMessage);
      }

      // send back to sender for confirmation/UI update
      socket.emit("receiveMessage", newMessage);
    } catch (error) {
      console.error("Error sending private message:", error);
      socket.emit("error", "Failed to send message");
    }
  });

  // 3. Disconnect
  socket.on("disconnect", () => {
    // find userId by socketId and clean up
    for (let [id, socketId] of onlineUsers.entries()) {
      if (socketId === socket.id) {
        onlineUsers.delete(id);
        break;
      }
    }
  });
});

server.listen(PORT, () => {
  console.log("server is running on port : ", PORT);
});
