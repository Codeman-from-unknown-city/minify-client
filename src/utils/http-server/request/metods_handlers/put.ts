/// <reference path="../../../interfaces.ts" />

import { ServerResponse } from "http";
import { join } from "path";
import sendChunck from "../../sendChunck";
import { saveFile } from "../../../workWhithFS";
import { sumIp } from "../../sumIp";
import checkedIncomingMessage from "../../../IncomingMessage";
import getRequestBody from "../data/getRequestBody";
import parseRequestBody from "../data/parseData";

export default async function handlePut(req: checkedIncomingMessage, res: ServerResponse): Promise<void> {
    const requestBody: string = await getRequestBody(req);
    const expample: I.File = {name: '', ext: '', code: ''};
    const file: I.File = parseRequestBody(requestBody, expample);

    const ip: string = req.socket.remoteAddress;
    const userId: string = sumIp(ip);
        
    await saveFile(userId, file);
        
    const fileName = file.name;
    sendChunck(res, `<a download href="${join('users_files', fileName)}">${fileName}</a>`);
}
