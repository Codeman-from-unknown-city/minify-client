import { extname } from "path";
import { MIME_TYPES } from "./../objects/mimeTypes";
import { ServerResponse } from "http";
import minify from "../../minifyCode";

export default function sendChunck(res: ServerResponse, path: string, chunck: string | Buffer): void {
    const ext: string = extname(path).substring(1);
    const compressedChunk = minify( {code: chunck.toString(), ext, name: ''} );

    res
      .writeHead(200, 'ok', {
          'Content-Length': compressedChunk.length,
          'Content-type': MIME_TYPES[ext] || MIME_TYPES['txt'],
      })
      .end(compressedChunk);
}
