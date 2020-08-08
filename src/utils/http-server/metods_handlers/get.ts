import { ServerResponse } from "http";
import { join } from "path";
import { notBindedSendError } from "../sendError";
import { cash } from "../../cash";
import sendChunck from "../sendChunck";
import { promises as fsPromises } from "fs";

const STATIC_PATH: string = join(process.cwd(), 'static');

export default async function handleGet(res: ServerResponse, url: string | undefined): Promise<void> {
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
