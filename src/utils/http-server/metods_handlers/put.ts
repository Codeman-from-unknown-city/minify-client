/// <reference path="../../interfaces.ts" />

import { ServerResponse } from "http";
import { notBindedSendError } from "../sendError";
import toProcessData from "../handle_data/handleData";
import { join } from "path";
import sendChunck from "../sendChunck";
import { saveFile } from "../../workWhithFS";
import { sumIp } from "../sumIp";
import awaitData from "./../awaitData";
import checkedIncomingMessage from "../../../IncomingMessage";

export default async function handlePut(req: checkedIncomingMessage, res: ServerResponse): Promise<void> {
    const sendError = notBindedSendError.bind(null, res);

    awaitData(req, async (err: Error | null, data: string): Promise<void> => {
        if (err) throw err;

        let file: I.Data;

        try {
            file = toProcessData(data);

            if (!file.name) throw new Error;
        } catch(e) {
            sendError(400, e.message);
            return;
        }

        const ip: string = req.socket.remoteAddress;
        const userId: string = sumIp(ip);
        
        await saveFile(userId, file);
        
        const fileName = file.name;
        sendChunck(res, `<a download href="${join('users_files', fileName)}">${fileName}</a>`);
    });
}
