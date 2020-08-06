import { IncomingMessage, ServerResponse } from "http";
import { cash } from "../objects/cash";
import sendChunck from "./sendChunck";
import { join } from "path";

function handleGet(res: ServerResponse, url: string | undefined): void {
    if (url) {
        const STATIC_PATH: string = join(process.cwd(), 'static');

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

function handlePost(req: IncomingMessage, res: ServerResponse): void {
    let body: string = '';

    req.on('data', (chunk: any): void => {
        body += chunk.toString();
    });

    req.on('end', (): void => {
        console.log(body);

        res.end();
    })
}

export { handleGet, handlePost };
