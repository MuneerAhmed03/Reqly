import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { initializeSocketIO } from "./io/io";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;
const corsOptions = {
  origin: '*',
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
