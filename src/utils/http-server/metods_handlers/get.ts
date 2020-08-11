import { ServerResponse } from "http";
import { join } from "path";
import { notBindedSendError } from "../sendError";
import cash from "../../cash";
import sendChunck from "../sendChunck";
import { Routing, IRoutingHandler } from "../routing";
import { sumIp } from "../sumIp";
import toProcessData from "../handle_data/handleData";
import minify from "../../minifyCode";
import { promises as fsPromises } from "fs";
import awaitData from "../awaitData";
import checkedIncomingMessage from "../../../IncomingMessage";

const WORK_DIR = process.cwd();
const STATIC_PATH: string = join(WORK_DIR, 'static');

const routing: Routing = new Routing();

routing
.set('/', (req: checkedIncomingMessage, res: ServerResponse): void => {
    const sendError = notBindedSendError.bind(null, res);
    const indexPath: string = join(WORK_DIR, 'static', 'index.html');
    const index: string | Buffer | undefined = cash.get(indexPath);
    if (!index) {
        sendError(500, 'Server is prepare page');
        return;
    }
    
    sendChunck(res, index, indexPath);
})
.set(/\/users_files\/*/, async (req: checkedIncomingMessage, res: ServerResponse): Promise<void> => {
    const sendError = notBindedSendError.bind(null, res);
    const { url } = req;

    try {
        const ip: string | undefined = req.socket.remoteAddress;
        if (!ip) {
            sendError(500, 'Unforessen situation');
            return;
        }

        const partsOfUrl: string[] = url.split('/');
        const filename: string = partsOfUrl[partsOfUrl.length - 1];

        const userId: string = sumIp(ip)
        const filePath: string = join(WORK_DIR, 'users_files', userId, filename);
        const fileContent: Buffer = await fsPromises.readFile(filePath);

        sendChunck(res, fileContent, filePath);
    } catch(e) {
        sendChunck(res, 'error', 'error.html');
    }
})
.set('/api/minify', (req: checkedIncomingMessage, res: ServerResponse): void => 
        awaitData(req, 
            (err: Error | null, data: string): void => {
                if (err) throw err;

                const sendError = notBindedSendError.bind(null, res);
                let file: I.Data;

                try {
                    file = toProcessData(data);
                } catch(e) {
                    sendError(400, e.message);
                    return;
                }

                sendChunck(res, minify(file.code, file.ext))
            }        
        )
);

export default async function handleGet(req: checkedIncomingMessage, res: ServerResponse): Promise<void> {
    const { url } = req;
    const cashedFile: string | Buffer | undefined = cash.get( join(STATIC_PATH, url) );
    const urlHandler: IRoutingHandler | void = routing.getHandler(url);
    
    if (urlHandler) urlHandler(req, res)
    else if (cashedFile) sendChunck(res, cashedFile, url);
    else sendChunck(res, 'error', 'error.html');
}
