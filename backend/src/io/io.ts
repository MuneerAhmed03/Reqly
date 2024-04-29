import { Server } from "socket.io";

let io: Server;

export function initializeSocketIO(httpServer: any) {
  io = new Server(httpServer,{
    cors:{
      origin:"http://localhost:5173"
    }
  });
}

export function getIO() {
  if (!io) {
    throw new Error("Socket.IO not initialized!");
  }
  return io;
}