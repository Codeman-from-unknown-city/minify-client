import { extname } from "path";
import { MIME_TYPES } from "./../objects/mimeTypes";
import { ServerResponse } from "http";
import minify from "../../minifyCode";

export default function sendChunk(res: ServerResponse, path: string, chunk: string | Buffer): void {
    const ext: string = extname(path).substring(1);
    const compressedChunk: string = minify( {code: chunk.toString(), ext} );

    res
      .writeHead(200, 'ok', {
          'Content-Length': compressedChunk.length,
          'Content-type': MIME_TYPES[ext] || MIME_TYPES['txt'],
      })
      .end(compressedChunk);
}
