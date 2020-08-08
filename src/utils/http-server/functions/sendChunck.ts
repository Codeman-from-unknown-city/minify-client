import { extname } from "path";
import { MIME_TYPES } from "./../objects/mimeTypes";
import { ServerResponse } from "http";

export default function sendChunk(res: ServerResponse, chunk: string | Buffer,  path?: string): void {
    const ext: string = path ? extname(path).substring(1) : '';

    res
      .writeHead(200, 'ok', {
          'Content-Length': chunk.length,
          'Content-type': MIME_TYPES[ext] || MIME_TYPES['txt'],
      })
      .end(chunk);
}
