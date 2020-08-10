import { IncomingMessage, ServerResponse } from "http";
import { join } from "path";
import { notBindedSendError } from "../../sendError";
import { cash } from "../../../cash";
import sendChunck from "../../sendChunck";
import { routing } from "./routing";

const WORK_DIR = process.cwd();
const STATIC_PATH: string = join(WORK_DIR, 'static');

export default async function handleGet(req: IncomingMessage, res: ServerResponse): Promise<void> {
    const sendError = notBindedSendError.bind(null, res);
    const { url } = req;

    if (!url) {
        sendError(500, 'Unforessen situation');
        return;
    }
        
    const cashedFile: string | Buffer | undefined = cash.get( join(STATIC_PATH, url) );
    const urlHandler: ((req: IncomingMessage, res: ServerResponse) => void) | undefined = url.includes('users_files') ?
    routing.get('/users_files/') :
    routing.get(url);
    
    if (urlHandler) urlHandler(req, res)
    else if (cashedFile) sendChunck(res, cashedFile, url);
    else sendChunck(res, 'error', 'error.html');
}
