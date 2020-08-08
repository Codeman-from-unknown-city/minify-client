import { createServer, IncomingMessage, ServerResponse } from "http";
import { cash } from "./utils/cash";
import { join } from "path"
import handleGet from "./utils/http-server/metods_handlers/get";
import handlePut from "./utils/http-server/metods_handlers/put";

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

        default:
            res.writeHead(405, 'Method Not Allowed').end();
    }
}).listen(process.env.PORT || '8000');
