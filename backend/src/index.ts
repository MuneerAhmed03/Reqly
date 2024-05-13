import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { initializeSocketIO, getIO } from "./io/io";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;
const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

const server = createServer(app);

initializeSocketIO(server);

const router = require("./routes/index");

app.use(express.json());
app.use(express.raw());
app.use(express.text());
app.use("/dump", router);

server.listen(port, () => {
  console.log("Server is running on ${port} ");
});
