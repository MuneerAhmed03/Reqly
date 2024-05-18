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
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = __importDefault(require("ioredis"));
const Dump_1 = require("./Dump");
require("dotenv").config();
const redisUrl = process.env.REDIS_URL;
if (!redisUrl) {
  throw new Error("REDIS_URL is not defined");
}
const client = new ioredis_1.default(redisUrl);
class RedisCollector {
  createDump() {
    return __awaiter(this, void 0, void 0, function* () {
      const dump = (0, Dump_1.newDump)();
      yield client.set(dump.name, JSON.stringify(dump), "EX", 60 * 60 * 2);
      return dump;
    });
  }
  createRequest(dump, request) {
    return __awaiter(this, void 0, void 0, function* () {
      const updatedDump = (0, Dump_1.addRequest)(dump, request);
      yield client
        .set(dump.name, JSON.stringify(updatedDump), "EX", 60 * 60 * 2)
        .then(() => {});
      return updatedDump;
    });
  }
  createMockResponse(dump) {
    return __awaiter(this, void 0, void 0, function* () {
      const updatedDump = (0, Dump_1.addMock)(dump, dump.mockResponse);
      yield client
        .set(dump.name, JSON.stringify(updatedDump), "EX", 60 * 60 * 2)
        .then(() => {});
      return updatedDump;
    });
  }
  getDump(name) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield client
        .get(name)
        .then((res) => {
          if (res) {
            return JSON.parse(res);
          } else {
            return null;
          }
        })
        .catch((err) => {
          return null;
        });
    });
  }
}
exports.default = RedisCollector;
