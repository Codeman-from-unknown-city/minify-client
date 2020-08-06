"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requestHandlers_1 = require("./functions/requestHandlers");
function httpHandler(req, res) {
    const { url, method } = req;
    switch (method) {
        case 'GET':
            requestHandlers_1.handleGet(res, url);
            break;
        case 'POST':
            requestHandlers_1.handlePost(req, res);
            break;
        default:
            res.writeHead(405, 'Method Not Allowed').end();
    }
}
exports.default = httpHandler;
