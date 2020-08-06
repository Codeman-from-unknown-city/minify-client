"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const mimeTypes_1 = require("./../objects/mimeTypes");
function sendChunck(res, path, chunck) {
    const ext = path_1.extname(path).substring(1);
    res
        .writeHead(200, 'ok', {
        'Content-Length': chunck.length,
        'Content-type': mimeTypes_1.MIME_TYPES[ext] || mimeTypes_1.MIME_TYPES['txt'],
    })
        .end(chunck);
}
exports.default = sendChunck;
