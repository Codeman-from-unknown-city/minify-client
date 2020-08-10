/// <reference path="../../../interfaces.ts" />

import { IncomingMessage, ServerResponse } from "http";
import { notBindedSendError } from "../../sendError";
import { join } from "path";
import sendChunck from "../../sendChunck";
import { cash } from "../../../cash";
import { sumIp } from "../../sumIp";
import toProcessData from "../../handle_data/handleData";
import minify from "../../../minifyCode";
import { promises as fsPromises } from "fs";
import awaitData from "../../awaitData";

const WORK_DIR = process.cwd();

export const routing: Map<string | RegExp, (req: IncomingMessage, res: ServerResponse) => void> = new Map()
.set('/', (req: IncomingMessage, res: ServerResponse): void => {
    const sendError = notBindedSendError.bind(null, res);
    const indexPath: string = join(WORK_DIR, 'static', 'index.html');
    const index: string | Buffer | undefined = cash.get(indexPath);
    if (!index) {
        sendError(500, 'Server is prepare page');
        return;
    }
    
    sendChunck(res, index, indexPath);
})
.set('/users_files/', async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
    const sendError = notBindedSendError.bind(null, res);
    const { url } = req;
    if (!url) {
        sendError(500, 'Unforessen situation');
        return;
    }

    try {
        const ip: string | undefined = req.socket.remoteAddress;
        if (!ip) {
            sendError(500, 'Unforessen situation');
            return;
        }

        const partsOfUrl: string[] = url.split('/');
        const filename: string = partsOfUrl[partsOfUrl.length - 1];

        const userId: string = sumIp(ip)
        const filePath: string = join(WORK_DIR, 'users_files', userId, filename);
        const fileContent: Buffer = await fsPromises.readFile(filePath);

        sendChunck(res, fileContent, filePath);
    } catch(e) {
        sendChunck(res, 'error', 'error.html');
    }
})
.set('/api/minify', (req: IncomingMessage, res: ServerResponse): void => 
        awaitData(req, 
            (err: Error | null, data: string): void => {
                if (err) throw err;

                const sendError = notBindedSendError.bind(null, res);
                let file: I.Data;

                try {
                    file = toProcessData(data);
                } catch(e) {
                    sendError(400, e.message);
                    return;
                }

                sendChunck(res, minify(file.code, file.ext))
            }        
        )
);
