import { ServerResponse } from "http";
import { deleteUserDir } from "../../workWhithFS";
import { sumIp } from "../sumIp";
import checkedIncomingMessage from "../../../IncomingMessage";

export default async function handlePost(req: checkedIncomingMessage, res: ServerResponse): Promise<void> {
    const ip: string | undefined = req.socket.remoteAddress;
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
