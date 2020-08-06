"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const WEBSOCKET_SERVER = require('ws').Server;
const http_1 = require("http");
const serverConfig_1 = require("./utils/http-server/objects/serverConfig");
const handleConnection_1 = require("./utils/ws-server/handleConnection");
const index_1 = __importDefault(require("./utils/http-server/index"));
new WEBSOCKET_SERVER({ server: http_1.createServer(index_1.default).listen(serverConfig_1.httpOptions) })
    .on('connection', handleConnection_1.handleConnection)
    .on('error', (error) => console.error(error));
