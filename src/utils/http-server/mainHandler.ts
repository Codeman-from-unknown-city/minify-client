import { cash } from "./cacheFiles";
import { routing } from "./routing";
import { IncomingMessage, ServerResponse } from "http";
import sendChunck from "./sendChunck";

const STATIC_PATH: string = `${process.cwd}/static`;

cash.addDirectory(STATIC_PATH);

export function httpHandler(req: IncomingMessage, res: ServerResponse): void {
    const { url } = req;
    if (url) {
        const routingHandler: any = routing[url];
        const cashedFile: any = cash.get(`${STATIC_PATH}/${url}`);

        if (routingHandler) {
            routingHandler(res, url);
            return;
        } else if (cashedFile) {
            sendChunck(res, url, cashedFile);
            return;
        }
    }


}
