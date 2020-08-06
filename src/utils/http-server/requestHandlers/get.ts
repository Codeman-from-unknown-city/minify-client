import { ServerResponse } from "http";
import { cash } from "../objects/cacheFiles";
import sendChunck from "../functions/sendChunck";
import { join } from "path"

const STATIC_PATH = join(process.cwd(), 'static');

cash.addDirectory(STATIC_PATH);

export default function handleGet(res: ServerResponse, url: string | undefined): void {
    if (url) {
        if (url === '/') {
            const indexPath: string = join(STATIC_PATH, 'index.html');
            const index: string | Buffer = cash.get(indexPath);
            if (index) {
                sendChunck(res, indexPath, index);
                return;
            }   
        }
        
        const cashedFile: string | Buffer | undefined = cash.get( join(STATIC_PATH, url) );
        if (cashedFile) sendChunck(res, url, cashedFile);

        return;
    }
}
