import { IncomingMessage } from "http";
import checkedIncomingMessage from "../../IncomingMessage";

export default async function getRequestBody(req: checkedIncomingMessage | IncomingMessage): Promise<string> {
    return new Promise(resolve => {

          let body: Buffer[] = [];

          req
             .on('data', (chunk: Buffer): void => {
                  body.push(chunk);
             })
             .on('end', (): void => {
                resolve(Buffer.concat(body).toString())
             });
    });
}
