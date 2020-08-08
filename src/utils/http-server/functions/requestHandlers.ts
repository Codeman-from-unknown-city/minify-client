import { IncomingMessage, ServerResponse } from "http";
import { cash } from "../../cash";
import sendChunck from "./sendChunck";
import { join } from "path";
import { promises as fsPromises } from "fs";
import toProcessData from "./handle_data/handleData";
import minify from "./../../minifyCode";

const STATIC_PATH: string = join(process.cwd(), 'static');

const notBindedSendError = (
    res: ServerResponse, 
    code: number, 
    reason: string = '', 
    chunk: Buffer | string = ''
    ): void => res.writeHead(code, reason).end(chunk); 

async function handleGet(res: ServerResponse, url: string | undefined): Promise<void> {
    const sendError = notBindedSendError.bind(null, res);

    if (!url) {
        sendError(500, 'Unforessen situation');
        return;
    }

    if (url === '/') {
        const indexPath: string = join(STATIC_PATH, 'index.html');
        const index: string | Buffer | undefined = cash.get(indexPath);
        if (!index) {
            sendError(500, 'Page prepare cash');
            return;
        }
        
        sendChunck(res, index, indexPath);
        return;
    }
        
    const cashedFile: string | Buffer | undefined = cash.get( join(STATIC_PATH, url) );
    if (cashedFile) sendChunck(res, cashedFile, url);
    else try {
        const filePath = join(STATIC_PATH, url)
        const fileContent = await fsPromises.readFile(filePath);
        sendChunck(res, fileContent, filePath);
    } catch(e) {
        sendChunck(res, 'error.html', 'error');
    }
}

function handlePost(req: IncomingMessage, res: ServerResponse): void {
    const sendError = notBindedSendError.bind(null, res);
    let body: string = '';

    req.on('data', (chunk: Buffer): void => {
        body += chunk.toString();
    });

    req.on('end', async (): Promise<void> => {
        let file;
        try {
            file = toProcessData(body);
        } catch(e) {
            sendError(400, e.message);
            return;
        }

        const ip: string | undefined = req.socket.remoteAddress;
        if (!ip) {
            sendError(500, 'Unforessen situation');
            return;
        }
        
        const userId: string = ip
            .split('.')
            .reduce((sum: number, current: string) => sum + +current, 0)
            .toString();
        
        const userDirPath: string = join(STATIC_PATH, userId);
        const fileName: string = file.name;
        const filePath: string = join(userDirPath, fileName);
        
        
        try {
            await fsPromises.mkdir(userDirPath);
        } catch(e) {} 
        finally {
            await fsPromises.writeFile(filePath, minify(file));

            sendChunck(res, `<a download href="${join(userId, fileName)}">${fileName}</a>`);
        }
    });
}

export { handleGet, handlePost };
