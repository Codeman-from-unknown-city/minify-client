import { ServerResponse } from "http";
import { join, extname } from "path";
import cash from "../../../cash";
import { Routing, IRoutingHandler } from "../../routing";
import  sumIp  from "../../sumIp";
import { promises as fsPromises } from "fs";
import checkedIncomingMessage from "../../checkedIncomingMessage";
import sendResponse from "../../sendResponse";
import KnownError from "../../../knownError";

class NotFoudError extends KnownError {
    constructor(message: string) {
        super(message, 404)
    }
}

class PrepareError extends KnownError {
    constructor() {
        super('Server is prepare page', 500)
    }
}

const WORK_DIR = process.cwd();
const STATIC_PATH: string = join(WORK_DIR, 'static');

const routing: Routing = new Routing()
.set('/', async (req: checkedIncomingMessage, res: ServerResponse): Promise<void> => {
    const indexPath: string = join(STATIC_PATH, 'index.html');
    const index: string | Buffer | undefined = cash.get(indexPath);

    if (!index) throw new PrepareError();
    
    sendResponse(res, 200, 'OK', index, 'html');
})
.set(/\/users_files\/*/, async (req: checkedIncomingMessage, res: ServerResponse): Promise<void> => {
    try {
        const { url, socket } = req;    
        const ip: string | undefined = socket.remoteAddress;
        const partsOfUrl: string[] = url.split('/');
        const fileName: string = partsOfUrl[partsOfUrl.length - 1];
        const userId: string = sumIp(ip);
        const filePath: string = join(WORK_DIR, 'users_files', userId, fileName);
        const fileContent: Buffer = await fsPromises.readFile(filePath);

        sendResponse(res, 200, 'OK', fileContent, extname(fileName));
    } catch(e) {
        throw new NotFoudError('File Not Found');
    }
});

export default async function handleGet(req: checkedIncomingMessage, res: ServerResponse): Promise<void> {
    const { url } = req;
    const cashedFile: string | Buffer | undefined = cash.get( join(STATIC_PATH, url) );
    const urlHandler: IRoutingHandler | undefined = routing.getHandler(url);
    
    if (urlHandler) await urlHandler(req, res);
    else if (cashedFile) sendResponse(res, 200, 'ok', cashedFile, extname(url).substring(1));
    else throw new NotFoudError('Page Not Found');
}
