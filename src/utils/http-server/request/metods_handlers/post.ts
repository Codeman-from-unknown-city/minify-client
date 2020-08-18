import { ServerResponse } from "http";
import { deleteUserDir } from "../../../workWhithFS";
import checkedIncomingMessage from "../../checkedIncomingMessage";
import sendResponse from "../../sendResponse";
import KnownError from "../../../knownError";
import { IRoutingHandler, Routing } from "../../routing";
import getRequestBody from "../data/getRequestBody";
import minify from "../../../minifyCode";
import { parseJSON } from "../data/parseRequestBody";
import { parseCookie } from "../../parseCookie";

class BadUrlError extends KnownError {
    constructor() {
        super('Unsupported URL', 400);
    }
}

const routing: Routing = new Routing()
.set('/delete_user_dir', async (req: checkedIncomingMessage, res: ServerResponse): Promise<void> => {
    const userId: string | undefined = parseCookie(req, 'id');
    if (!userId) {
        res.writeHead(400, 'Bad Request');
        return;
    }

    await deleteUserDir(userId);
    
    sendResponse(res, 200, 'ok');
})
.set('/api/minify', async (req: checkedIncomingMessage, res: ServerResponse): Promise<void> =>  {
    const requestBody: string = await getRequestBody(req);
    const objInterface: I.Data = {ext: '', code: ''};
    const data: I.Data = parseJSON(requestBody, objInterface);
    const { ext } = data;

    sendResponse(res, 200, 'OK', minify(data.code, ext), ext);
});

export default async function handlePost(req: checkedIncomingMessage, res: ServerResponse): Promise<void> {
    const { url } = req;
    const urlHanler: IRoutingHandler | undefined = routing.getHandler(url);

    if (!urlHanler) throw new BadUrlError();

    await urlHanler(req, res);
}
