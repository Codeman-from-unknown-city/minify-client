"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const serverConfig_1 = require("./utils/http-server/objects/serverConfig");
const cash_1 = require("./utils/cash");
const path_1 = require("path");
const index_1 = __importDefault(require("./utils/http-server/index"));
cash_1.cash.addDirectory(path_1.join(process.cwd(), 'static'));
http_1.createServer(index_1.default).listen(serverConfig_1.httpOptions);
