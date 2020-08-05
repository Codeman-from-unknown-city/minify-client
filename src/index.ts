const WEBSOCKET_SERVER = require('ws').Server;
import { serverConfig } from "./utils/ws-server/serverConfig";
import { handleConnection as connectionHandler }from "./utils/ws-server/handleConnection"

new WEBSOCKET_SERVER(serverConfig)
.on('connection', connectionHandler)
.on('error', (error: Error): void => console.error(error));
