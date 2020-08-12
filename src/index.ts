import { createServer, IncomingMessage, ServerResponse } from "http";
import cash from "./utils/cash";
import { join } from "path"
import handleGet from "./utils/http-server/request/metods_handlers/get";
import handlePut from "./utils/http-server/request/metods_handlers/put";
import handlePost from "./utils/http-server/request/metods_handlers/post";
import checkedIncomingMessage from "./utils/IncomingMessage";
import KnownError from "./utils/knownError";

class UnforeseenSituationError extends KnownError {
    constructor(message: string = 'Unforeseen Situation') {
        super(message, 500);
    }
}

cash.addDirectory( join(process.cwd(), 'static') );

createServer((req: IncomingMessage, res: ServerResponse): void => {
    try {
        const { method, url } = req;

        if (!url && !req.socket.remoteAddress) throw new UnforeseenSituationError();
    
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
    } catch(error) {
        if (error instanceof KnownError) {

        } else throw error;
    } finally {
        res.end();
    }
}).listen(process.env.PORT || 8000);
