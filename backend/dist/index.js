"use strict";
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (
          !desc ||
          ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }
    : function (o, v) {
        o["default"] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const io_1 = require("./io/io");
const cron = __importStar(require("node-cron"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};
app.use((0, cors_1.default)(corsOptions));
const server = (0, http_1.createServer)(app);
(0, io_1.initializeSocketIO)(server);
const router = require("./routes/index");
app.use(express_1.default.json());
app.use(express_1.default.raw());
app.use(express_1.default.text());
app.use("/dump", router);
cron.schedule(
  "*/12 * * * *",
  () => {
    console.log("Live!");
  },
  {
    scheduled: true,
    timezone: "Asia/Singapore",
  },
);
server.listen(port, () => {
  console.log("Server is running on ${port} ");
});
