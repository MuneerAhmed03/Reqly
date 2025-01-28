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

  io.on("connection", (socket) => {
    socket.on("joinRoom", (dumpName: string) => {
      socket.rooms.forEach((room) => {
        if (room !== socket.id) {
          socket.leave(room);
        }
      });
      socket.join(dumpName);
    });
  });
}

export function getIO() {
  if (!io) {
    throw new Error("Socket.IO not initialized!");
  }
  return io;
}

export function emitToRoom(room: string, event: string, data: any) {
  if (!io) {
    throw new Error("Socket.IO not initialized!");
  }
  io.to(room).emit(event, data);
}
