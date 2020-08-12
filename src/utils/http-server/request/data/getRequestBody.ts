import { IncomingMessage } from "http";
import checkedIncomingMessage from "../../checkedIncomingMessage";

export default async function getRequestBody(req: checkedIncomingMessage | IncomingMessage): Promise<string> {
   return new Promise(resolve => {
      let body: Buffer[] = [];

      req
         .on('data', (chunk: Buffer): number => body.push(chunk))
         .on('end', (): void => resolve( Buffer.concat(body).toString() ));
   });
}
