import { IncomingMessage, ServerResponse } from "http";
import { notBindedSendError } from "../sendError";
import toProcessData from "../handle_data/handleData";
import { join } from "path";
import { promises as fsPromises } from "fs";
import minify from "../../minifyCode";
import sendChunck from "../sendChunck";

export default async function handlePut(req: IncomingMessage, res: ServerResponse): Promise<void> {
    const sendError = notBindedSendError.bind(null, res);
    let body: string = '';

    req.on('data', (chunk: Buffer): void => {
        body += chunk.toString();
    });

    req.on('end', async (): Promise<void> => {
        let file;
        try {
            file = toProcessData(body);
        } catch(e) {
            sendError(400, e.message);
            return;
        }

        const ip: string | undefined = req.socket.remoteAddress;
        if (!ip) {
            sendError(500, 'Unforessen situation');
            return;
        }
        
        const userId: string = ip
            .split('.')
            .reduce((sum: number, current: string) => sum + +current, 0)
            .toString();
        
        const userDirPath: string = join(process.cwd(), 'users_files', userId);
        const fileName: string = file.name;
        const filePath: string = join(userDirPath, fileName);
        
        
        try {
            await fsPromises.mkdir(userDirPath);
        } catch(e) {} 
        finally {
            await fsPromises.writeFile(filePath, minify(file));

            sendChunck(res, `<a download href="${join(userId, fileName)}">${fileName}</a>`);
        }
    });
}