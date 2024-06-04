import { Server } from "socket.io";
require("dotenv").config();

const URL = process.env.ORIGIN_URL;

let io: Server;

export function initializeSocketIO(httpServer: any) {
  io = new Server(httpServer, {
    cors: {
      origin: URL,
    },
  });
}

export function getIO() {
  if (!io) {
    throw new Error("Socket.IO not initialized!");
  }
  return io;
}
