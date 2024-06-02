import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import logger from "./middlewares/middlewares.logger.js";
import userRoutes from "./routes/route.user.js";
import chatRoomRoutes from "./routes/route.chatroom.js";
import authenticateToken from "./middlewares/middleware.auth.js";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(logger);
app.use("/api/users/", userRoutes);
app.use("/api/chatrooms/", chatRoomRoutes);

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
