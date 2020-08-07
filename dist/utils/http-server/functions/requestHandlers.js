"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePost = exports.handleGet = void 0;
const cash_1 = require("../../cash");
const sendChunck_1 = __importDefault(require("./sendChunck"));
const path_1 = require("path");
const notBindedSendError = (res, code, reason = '', chunk = '') => res.writeHead(code, reason).end(chunk);
function handleGet(res, url) {
    const sendError = notBindedSendError.bind(null, res);
    if (!url) {
        sendError(500, 'Unforessen situation');
        return;
    }
    const STATIC_PATH = path_1.join(process.cwd(), 'static');
    if (url === '/') {
        const indexPath = path_1.join(STATIC_PATH, 'index.html');
        const index = cash_1.cash.get(indexPath);
        if (!index) {
            sendError(500, 'Page prepare cash');
            return;
        }
        sendChunck_1.default(res, indexPath, index);
        return;
    }
    const cashedFile = cash_1.cash.get(path_1.join(STATIC_PATH, url));
    if (cashedFile)
        sendChunck_1.default(res, url, cashedFile);
}
exports.handleGet = handleGet;
function handlePost(req, res) {
    const sendError = notBindedSendError.bind(null, res);
    let body = '';
    req.on('data', (chunk) => {
        body += chunk.toString();
    });
    req.on('end', () => {
        const ip = req.socket.remoteAddress;
        if (!ip) {
            sendError(500, 'Unforessen situation');
            return;
        }
        const userId = ip.split('').reduce((sum, current) => +sum + +current, 0);
    });
}
exports.handlePost = handlePost;
