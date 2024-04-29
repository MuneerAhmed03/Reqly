"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIO = exports.initializeSocketIO = void 0;
const socket_io_1 = require("socket.io");
let io;
function initializeSocketIO(httpServer) {
    io = new socket_io_1.Server(httpServer);
}
exports.initializeSocketIO = initializeSocketIO;
function getIO() {
    if (!io) {
        throw new Error("Socket.IO not initialized!");
    }
    return io;
}
exports.getIO = getIO;
