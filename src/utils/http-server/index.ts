import handelGet from "./functions/get";
import handelPost from "./functions/post";
import { IncomingMessage, ServerResponse } from "http";

export default function httpHandler(req: IncomingMessage, res: ServerResponse): void {
    const { url, method } = req;

    switch(method) {
        case 'GET':
            handelGet(res, url);
            break;

        case 'POST':
            handelPost(req);
            break;

        default:
            res.writeHead(405, 'Method Not Allowed').end()
    }
}
