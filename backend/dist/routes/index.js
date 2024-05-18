"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
const express_1 = __importDefault(require("express"));
const RedisCollector_1 = __importDefault(require("../model/RedisCollector"));
const io_1 = require("../io/io");
const router = express_1.default.Router();
const redisCollector = new RedisCollector_1.default();
router.get("/generate", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    yield redisCollector.createDump().then((dump) => {
      res.send(dump);
    });
  }),
);
router.all("/inspect/:randomUrl", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const dump = yield redisCollector.getDump(req.params.randomUrl);
    if (dump != null) {
      const requestData = {
        url: req.params.randomUrl,
        body: req.body,
        method: req.method,
        headers: Object.entries(req.headers).map(([key, value]) => {
          if (Array.isArray(value)) {
            return [key, value.join(", ")];
          } else {
            return [key, value || ""];
          }
        }),
        query: req.query,
        bodyPara: req.body,
      };
      yield redisCollector
        .createRequest(dump, requestData)
        .then((updatedDump) => {
          res.send(dump.mockResponse);
          (0, io_1.getIO)().emit("newRequest", { dump: updatedDump });
        });
    } else {
      res.send("Invalid URL");
    }
  }),
);
(0, io_1.getIO)().on("connection", (socket) => {
  socket.on("response", (dump) =>
    __awaiter(void 0, void 0, void 0, function* () {
      try {
        if (dump != null) {
          const updatedDump = yield redisCollector.createMockResponse(dump);
          (0, io_1.getIO)().emit("newRequest", { dump: updatedDump });
        } else {
          console.error(`Dump not found: ${dump.name}`);
        }
      } catch (error) {
        console.error(error);
      }
    }),
  );
});
router.get("/retrieve/:name", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const dump = yield redisCollector.getDump(req.params.name);
    if (dump != null) {
      res.send(dump);
    } else {
      res.status(404).send("Dump not found");
    }
  }),
);
module.exports = router;
