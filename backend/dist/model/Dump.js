"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMock = exports.addRequest = exports.newDump = void 0;
const uuid_1 = require("uuid");
const newDump = () => ({
    name: (0, uuid_1.v4)(),
    requests: [],
    mockResponse: {}
});
exports.newDump = newDump;
const addRequest = (dump, request) => (Object.assign(Object.assign({}, dump), { requests: [...dump.requests, request] }));
exports.addRequest = addRequest;
const addMock = (dump, mock) => (Object.assign(Object.assign({}, dump), { mockResponse: mock }));
exports.addMock = addMock;
