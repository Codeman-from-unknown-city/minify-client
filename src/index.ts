import { createServer, IncomingMessage, ServerResponse } from "http";
import { cash } from "./utils/cash";
import { join } from "path"
import handleGet from "./utils/http-server/metods_handlers/get";
import handlePut from "./utils/http-server/metods_handlers/put";
import handlePost from "./utils/http-server/metods_handlers/post";

cash.addDirectory( join(process.cwd(), 'static') );

createServer((req: IncomingMessage, res: ServerResponse): void => {
    const { url, method } = req;
    
    switch(method) {
        case 'GET':
            handleGet(res, url);
            break;

        case 'PUT': 
            handlePut(req, res);
            break;

        case 'POST':
            handlePost(req, res);

        default:
            res.writeHead(501, 'Method Not Allowed').end();
    }
}).listen(process.env.PORT || 8000);
