import { createServer, IncomingMessage, ServerResponse } from "http";
import cash from "./utils/cash";
import { join } from "path";
import handleGet from "./utils/http-server/request/metods_handlers/get";
import handlePut from "./utils/http-server/request/metods_handlers/put";
import handlePost from "./utils/http-server/request/metods_handlers/post";
import checkedIncomingMessage from "./utils/http-server/checkedIncomingMessage";
import KnownError from "./utils/knownError";
import sendResponse from "./utils/http-server/sendResponse";
import createErrorTemplate from "./utils/http-server/errPageTemplate/createErrorTemplate";
import { promises as fsPromises } from "fs";
import { Socket } from "net";

class UnforeseenSituationError extends KnownError {
    constructor() {
        super('Unforeseen Situation', 500);
    }
}

class MethodNotAllowedErr extends KnownError {
    constructor() {
        super('Method Not Allowed', 501);
    }
}

cash.addDirectory( join(process.cwd(), 'static') );

createServer(async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
    try {
        const { method, url } = req;

        if (!url && !req.socket.remoteAddress) throw new UnforeseenSituationError();
    
        switch(method) {
            case 'GET':
                await handleGet(<checkedIncomingMessage>req, res);
                break;

            case 'PUT': 
                await handlePut(<checkedIncomingMessage>req, res);
                break;

            case 'POST':
                await handlePost(<checkedIncomingMessage>req, res);
                break;

            default:
                throw new MethodNotAllowedErr();
        }
    } catch(error) {

        if (error instanceof KnownError) {
            const { statusCode, message } = error;
            if (message.includes('Page Not Found')) {
                sendResponse(res, statusCode, message, createErrorTemplate(`${statusCode} Page Not Found`), 'html');
            } else {
                sendResponse(res, statusCode, message);
            }
        } else throw error;

    } finally {
        res.end();
    }
})
.listen(process.env.PORT || 8000)
.on('clientError', (err: NodeJS.ErrnoException, socket: Socket) => {
    if (err.code === 'ECONNRESET' || !socket.writable) return;
    
    socket.end( createErrorTemplate(`400 Bad Request`) );
});

process.on('uncaughtException', async (error: Error): Promise<void> => {
    await fsPromises.writeFile('../errors_logs', `${error.name}: ${error.stack}\n`);
    process.exit(1);
});
