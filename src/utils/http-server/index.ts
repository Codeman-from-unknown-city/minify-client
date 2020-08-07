import { handlePost, handleGet } from "./functions/requestHandlers";
import { IncomingMessage, ServerResponse } from "http";

export default function httpHandler(req: IncomingMessage, res: ServerResponse): void {
    const { url, method } = req;

    switch(method) {
        case 'GET':
            handleGet(res, url);
            break;

        case 'POST':
            handlePost(req, res);
            break;

        default:
            res.writeHead(405, 'Method Not Allowed').end();
    }
}
