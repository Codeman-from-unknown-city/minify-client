/// <reference path="../../../interfaces.ts" />

import { ServerResponse } from "http";
import { join } from "path";
import { saveFile } from "../../../workWhithFS";
import checkedIncomingMessage from "../../checkedIncomingMessage";
import getRequestBody from "../data/getRequestBody";
import { parseJSON } from "../data/parseRequestBody";
import sendResponse from "../../sendResponse";
import { parseCookie } from "../../parseCookie";

export default async function handlePut(req: checkedIncomingMessage, res: ServerResponse): Promise<void> {
    const userId: string | undefined = parseCookie(req, 'id');
    if (!userId) {
        res.writeHead(400, 'Bad Request');
        return;
        
    }
    
    const requestBody: string = await getRequestBody(req);
    const objInterface: I.File = {name: '', ext: '', code: ''};
    const file: I.File = parseJSON(requestBody, objInterface);
        
    await saveFile(userId, file);
        
    const fileName = file.name;
    sendResponse(res, 201, 'Created');
    res.setHeader('Location', join('users_files', fileName));
}
