import { createServer, IncomingMessage, ServerResponse } from "http";
import { cash } from "./utils/cash";
import { join } from "path"
import handleGet from "./utils/http-server/metods_handlers/get";
import handlePut from "./utils/http-server/metods_handlers/put";
import handlePost from "./utils/http-server/metods_handlers/post";
import checkedIncomingMessage from "./IncomingMessage";

cash.addDirectory( join(process.cwd(), 'static') );

createServer((req: IncomingMessage, res: ServerResponse): void => {
    const { method, url } = req;

    if (!url && !req.socket.remoteAddress)
    
    switch(method) {
        case 'GET':
            handleGet(<checkedIncomingMessage>req, res);
            break;

        case 'PUT': 
            handlePut(<checkedIncomingMessage>req, res);
            break;

        case 'POST':
            handlePost(<checkedIncomingMessage>req, res);

        default:
            res.writeHead(501, 'Method Not Allowed').end();
    }
}).listen(process.env.PORT || 8000);
