"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const get_1 = __importDefault(require("./functions/get"));
const post_1 = __importDefault(require("./functions/post"));
function httpHandler(req, res) {
    const { url, method } = req;
    switch (method) {
        case 'GET':
            get_1.default(res, url);
            break;
        case 'POST':
            post_1.default(req, res);
            break;
        default:
            res.writeHead(405, 'Method Not Allowed').end();
    }
}
exports.default = httpHandler;
