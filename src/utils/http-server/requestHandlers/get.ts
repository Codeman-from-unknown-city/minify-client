import { IncomingMessage, ServerResponse } from "http";
import { cash } from "../objects/cacheFiles";
import { routing } from "../objects/routing";
import sendChunck from "../functions/sendChunck";

const STATIC_PATH = `${process.cwd}/static`;

cash.addDirectory(STATIC_PATH);

export default function handleGet(res: ServerResponse, url: string | undefined): void {
    if (url) {
        const routingHandler: any = routing[url];
        const cashedFile: string | Buffer | undefined = cash.get(`${STATIC_PATH}/${url}`);

        if (routingHandler) routingHandler(res, url);
        else if (cashedFile) sendChunck(res, url, cashedFile);

        return;
    }
}
