"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const io_1 = require("./io/io");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const corsOptions = {
    origin: "http://localhost:5173",
    optionsSuccessStatus: 200
};
app.use((0, cors_1.default)(corsOptions));
const server = (0, http_1.createServer)(app);
(0, io_1.initializeSocketIO)(server);
const router = require("./routes/index");
app.use(express_1.default.json());
app.use(express_1.default.raw());
app.use(express_1.default.text());
app.use("/dump", router);
server.listen(8000, () => {
    console.log("Server is running on port 8000");
});