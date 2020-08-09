import { ServerResponse } from "http";

export const notBindedSendError = (
    res: ServerResponse, 
    code: number, 
    reason: string = '', 
    chunk: Buffer | string = ''
    ): void => res.writeHead(code, reason).end(chunk); 
