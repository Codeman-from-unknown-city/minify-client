"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WEBSOCKET_SERVER = require('ws').Server;
const serverConfig_1 = require("./utils/server/serverConfig");
const handleConnection_1 = require("./utils/server/handleConnection");
new WEBSOCKET_SERVER(serverConfig_1.serverConfig)
    .on('connection', handleConnection_1.handleConnection)
    .on('error', (error) => console.error(error));
