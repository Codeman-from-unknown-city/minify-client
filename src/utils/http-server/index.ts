import handelGet from "./requestHandlers/get";
import { IncomingMessage, ServerResponse } from "http";

export default function httpHandler(req: IncomingMessage, res: ServerResponse): void {
    const { url, method } = req;
    if (method === 'GET') handelGet(res, url);
}
