"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cacheFiles_1 = require("../objects/cacheFiles");
const sendChunck_1 = __importDefault(require("../functions/sendChunck"));
const path_1 = require("path");
const STATIC_PATH = path_1.join(process.cwd(), 'static');
cacheFiles_1.cash.addDirectory(STATIC_PATH);
function handleGet(res, url) {
    if (url) {
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
exports.default = handleGet;
