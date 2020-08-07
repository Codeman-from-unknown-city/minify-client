import { IncomingMessage, ServerResponse } from "http";
import { cash } from "../../cash";
import sendChunck from "./sendChunck";
import { join } from "path";

const notBindedSendError = (
    res: ServerResponse, 
    code: number, 
    reason: string = '', 
    chunk: Buffer | string = ''
    ): void => res.writeHead(code, reason).end(chunk); 

function handleGet(res: ServerResponse, url: string | undefined): void {
    const sendError = notBindedSendError.bind(null, res);

    if (!url) {
        sendError(500, 'Unforessen situation');
        return;
    }
      
    const STATIC_PATH: string = join(process.cwd(), 'static');

    if (url === '/') {
        const indexPath: string = join(STATIC_PATH, 'index.html');
        const index: string | Buffer | undefined = cash.get(indexPath);
        if (!index) {
            sendError(500, 'Page prepare cash');
            return;
        }
        
        sendChunck(res, indexPath, index);
        return;
    }
        
    const cashedFile: string | Buffer | undefined = cash.get( join(STATIC_PATH, url) );
    if (cashedFile) sendChunck(res, url, cashedFile);
}

function handlePost(req: IncomingMessage, res: ServerResponse): void {
    const sendError = notBindedSendError.bind(null, res);
    let body: string = '';

    req.on('data', (chunk: Buffer): void => {
        body += chunk.toString();
    });

    req.on('end', (): void => {
        const ip: string | undefined = req.socket.remoteAddress;
        if (!ip) {
            sendError(500, 'Unforessen situation');
            return;
        }

        const userId: number = ip.split('').reduce((sum, current) => +sum + +current, 0);
    });
}

export { handleGet, handlePost };
