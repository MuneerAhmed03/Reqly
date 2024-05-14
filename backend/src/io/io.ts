import { Server } from "socket.io";

let io: Server;

export function initializeSocketIO(httpServer: any) {
  io = new Server(httpServer,{
    cors:{
      origin:"https://reqly.vercel.app"
    }
  });
}

export function getIO() {
  if (!io) {
    throw new Error("Socket.IO not initialized!");
  }
  return io;
}