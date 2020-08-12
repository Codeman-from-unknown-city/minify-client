import { ServerResponse } from "http";
import { deleteUserDir } from "../../../workWhithFS";
import  sumIp  from "../../sumIp";
import checkedIncomingMessage from "../../checkedIncomingMessage";
import sendResponse from "../../sendResponse";
import KnownError from "../../../knownError";
import { IRoutingHandler, Routing } from "../../routing";
import getRequestBody from "../data/getRequestBody";
import minify from "../../../minifyCode";
import parseRequestBody from "../data/parseData";

class BadUrlError extends KnownError {
    constructor() {
        super('Unsupported URL', 400);
    }
}

const routing: Routing = new Routing()
.set('/delete_user_dir', async (req: checkedIncomingMessage, res: ServerResponse): Promise<void> => {
    const ip: string | undefined = req.socket.remoteAddress;
    const userId: string = sumIp(ip);

    await deleteUserDir(userId);
    
    sendResponse(res, 200, 'ok');
})
.set('/api/minify', async (req: checkedIncomingMessage, res: ServerResponse): Promise<void> =>  {
    const requestBody: string = await getRequestBody(req);
    const example: I.Data = {ext: '', code: ''};
    const data: I.Data = parseRequestBody(requestBody, example);
    const { ext } = data;

    sendResponse(res, 200, 'OK', minify(data.code, ext), ext);
});

export default async function handlePost(req: checkedIncomingMessage, res: ServerResponse): Promise<void> {
    const { url } = req;
    const urlHanler: IRoutingHandler | undefined = routing.getHandler(url);

    if (!urlHanler) throw new BadUrlError();

    await urlHanler(req, res);
}
