import { IncomingMessage, ServerResponse } from "http";
import { deleteUserDir } from "../workWhithFS";
import { sumIp } from "../sumIp";
import { notBindedSendError } from "../sendError";

export default async function handlePost(req: IncomingMessage, res: ServerResponse): Promise<void> {
    const sendError = notBindedSendError.bind(null, res);

    const ip: string | undefined = req.socket.remoteAddress;
    if (!ip) {
        sendError(500, 'Unforessen situation');
        return;
    }

    const userId: string = sumIp(ip);

    try {
        await deleteUserDir(userId);
    } catch(e) {} 
    finally {
        res
           .writeHead(200, 'ok')
           .end();
    }
}
