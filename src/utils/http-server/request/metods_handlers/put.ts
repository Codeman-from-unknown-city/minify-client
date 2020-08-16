/// <reference path="../../../interfaces.ts" />

import { ServerResponse } from "http";
import { join } from "path";
import { saveFile } from "../../../workWhithFS";
import sumIp  from "../../sumIp";
import checkedIncomingMessage from "../../checkedIncomingMessage";
import getRequestBody from "../data/getRequestBody";
import { parseJSON } from "../data/parseRequestBody";
import sendResponse from "../../sendResponse";

export default async function handlePut(req: checkedIncomingMessage, res: ServerResponse): Promise<void> {
    const requestBody: string = await getRequestBody(req);
    const objInterface: I.File = {name: '', ext: '', code: ''};
    const file: I.File = parseJSON(requestBody, objInterface);
    const ip: string = req.socket.remoteAddress;
    const userId: string = sumIp(ip);
        
    await saveFile(userId, file);
        
    const fileName = file.name;
    sendResponse(res, 201, 'Created');
    res.setHeader('Location', join('users_files', fileName));
}
