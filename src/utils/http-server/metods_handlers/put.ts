/// <reference path="../../interfaces.ts" />

import { IncomingMessage, ServerResponse } from "http";
import { notBindedSendError } from "../sendError";
import toProcessData from "../handle_data/handleData";
import { join } from "path";
import sendChunck from "../sendChunck";
import { saveFile } from "../workWhithFS";
import { sumIp } from "../sumIp";
import awaitData from "./../awaitData";

export default async function handlePut(req: IncomingMessage, res: ServerResponse): Promise<void> {
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

        const ip: string | undefined = res.socket.remoteAddress;
        if (!ip) {
            sendError(500, 'Unforessen situation');
            return;
        }
        
        const userId: string = sumIp(ip);
        
        await saveFile(userId, file);
        
        const fileName = file.name;
        sendChunck(res, `<a download href="${join(userId, fileName)}">${fileName}</a>`);
    });
}
