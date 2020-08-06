"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const mimeTypes_1 = require("./../objects/mimeTypes");
const minifyCode_1 = __importDefault(require("../../minifyCode"));
function sendChunck(res, path, chunck) {
    const ext = path_1.extname(path).substring(1);
    const compressedChunk = minifyCode_1.default({ code: chunck.toString(), ext });
    res
        .writeHead(200, 'ok', {
        'Content-Length': compressedChunk.length,
        'Content-type': mimeTypes_1.MIME_TYPES[ext] || mimeTypes_1.MIME_TYPES['txt'],
    })
        .end(compressedChunk);
}
exports.default = sendChunck;
