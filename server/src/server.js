import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import logger from "./middlewares/middlewares.logger.js";
import authRoutes from "./routes/route.auth.js";
import chatroomRoutes from "./routes/route.chatroom.js";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(logger);
app.use("/api/users/", authRoutes);
app.use("/api/chatrooms/", chatroomRoutes);

app.use(express.json());

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
