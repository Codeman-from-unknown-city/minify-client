import { IncomingMessage } from "http";

export default function awaitData(req: IncomingMessage, callback: (err: Error | null, data: string) => void) {
    let body: Buffer[] = [];

    req
       .on('data', (chunk: Buffer): void => {
            body.push(chunk);
       })
       .on('end', (): void => {
            callback(null, Buffer.concat(body).toString());
       });
}
