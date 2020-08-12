"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const cash_1 = __importDefault(require("./utils/cash"));
const path_1 = require("path");
const get_1 = __importDefault(require("./utils/http-server/request/metods_handlers/get"));
const put_1 = __importDefault(require("./utils/http-server/request/metods_handlers/put"));
const post_1 = __importDefault(require("./utils/http-server/request/metods_handlers/post"));
cash_1.default.addDirectory(path_1.join(process.cwd(), 'static'));
http_1.createServer((req, res) => {
    const { method, url } = req;
    if (!url && !req.socket.remoteAddress)
        switch (method) {
            case 'GET':
                get_1.default(req, res);
                break;
            case 'PUT':
                put_1.default(req, res);
                break;
            case 'POST':
                post_1.default(req, res);
            default:
                res.writeHead(501, 'Method Not Allowed').end();
        }
}).listen(process.env.PORT || 8000);
