"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mimeTypes_1 = require("./mimeTypes");
function sendResponse(res, statusCode, statusMessage, chunk, ext = 'txt') {
    res.statusCode = statusCode;
    res.statusMessage = statusMessage;
    if (chunk) {
        res.setHeader('Content-Length', chunk.length);
        res.setHeader('Content-type', mimeTypes_1.MIME_TYPES[ext]);
        res.write(chunk);
    }
}
exports.default = sendResponse;
