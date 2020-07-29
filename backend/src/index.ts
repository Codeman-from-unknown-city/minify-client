const WEBSOCKET_SERVER = require('ws').Server;
import { serverConfig } from "./utils/server/serverConfig";
import { handleConnection as connectionHandler }from "./utils/server/handleConnection"

new WEBSOCKET_SERVER(serverConfig)
.on('connection', connectionHandler)
.on('error', (error: Error): void => console.error(error));
