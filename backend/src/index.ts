import express from "express";
import { createServer } from "http";
import { initializeSocketIO } from "./io/io";
import * as cron from "node-cron";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;
const ORIGIN_URL = process.env.ORIGIN_URL || "http://localhost:8080/"
const CRON_URL = process.env.CRON_URL || ""
const corsOptions = {
  origin: [ORIGIN_URL,CRON_URL],
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.get("/health", async (req, res) => {
  res.send("Server Running");
});

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
