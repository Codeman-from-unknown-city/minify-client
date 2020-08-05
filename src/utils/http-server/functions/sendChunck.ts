import { extname } from "path";
import { MIME_TYPES } from "./../objects/mimeTypes";
import { ServerResponse } from "http";

export default function sendChunck(res: ServerResponse, url: string, chunck: string | Buffer): void {
    const ext: string = extname(url).substring(1);
    res
      .writeHead(200, 'ok', {
          'Content-Length': chunck.length,
          'Content-type': MIME_TYPES[ext],
      })
      .end(chunck);
}
