import { Server as WEBSOCKET_SERVER } from "ws";
import { createServer } from "http";
import { httpOptions } from "./utils/http-server/objects/serverConfig";
import { handleConnection as connectionHandler }from "./utils/ws-server/handleConnection";
import { cash } from "./utils/http-server/objects/cash";
import { join } from "path"
import httpHandler from "./utils/http-server/index";

cash.addDirectory( join(process.cwd(), 'static') );

new WEBSOCKET_SERVER({ server: createServer(httpHandler).listen(httpOptions) })
.on('connection', connectionHandler)
.on('error', (error: Error): void => console.error(error));
