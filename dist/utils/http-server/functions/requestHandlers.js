"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePost = exports.handleGet = void 0;
const cacheFiles_1 = require("../objects/cacheFiles");
const sendChunck_1 = __importDefault(require("./sendChunck"));
const path_1 = require("path");
function handleGet(res, url) {
    if (url) {
        const STATIC_PATH = path_1.join(process.cwd(), 'static');
        if (url === '/') {
            const indexPath = path_1.join(STATIC_PATH, 'index.html');
            const index = cacheFiles_1.cash.get(indexPath);
            if (index) {
                sendChunck_1.default(res, indexPath, index);
                return;
            }
        }
        const cashedFile = cacheFiles_1.cash.get(path_1.join(STATIC_PATH, url));
        if (cashedFile)
            sendChunck_1.default(res, url, cashedFile);
        return;
    }
}
exports.handleGet = handleGet;
function handlePost(req, res) {
    let body = '';
    req.on('data', (chunk) => {
        body += chunk.toString();
    });
    req.on('end', () => {
        console.log(body);
        res.end();
    });
}
exports.handlePost = handlePost;
