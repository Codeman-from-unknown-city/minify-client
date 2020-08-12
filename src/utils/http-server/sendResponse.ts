import { MIME_TYPES } from "./mimeTypes";
import { ServerResponse } from "http";

export default function sendResponse(
   res: ServerResponse,
   statusCode: number,
   statusMessage: string,
   chunk?: string | Buffer,
   ext: string = 'txt'
): void {
   res.statusCode = statusCode;
   res.statusMessage = statusMessage;

   if (chunk) {
      res.setHeader('Content-Length', chunk.length);
      res.setHeader('Content-type', MIME_TYPES[ext]);
      res.write(chunk);
   }
}
