"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const cash_1 = require("./utils/cash");
const path_1 = require("path");
const get_1 = __importDefault(require("./utils/http-server/metods_handlers/get"));
const put_1 = __importDefault(require("./utils/http-server/metods_handlers/put"));
cash_1.cash.addDirectory(path_1.join(process.cwd(), 'static'));
http_1.createServer((req, res) => {
    const { url, method } = req;
    switch (method) {
        case 'GET':
            get_1.default(res, url);
            break;
        case 'PUT':
            put_1.default(req, res);
            break;
        default:
            res.writeHead(405, 'Method Not Allowed').end();
    }
}).listen(process.env.PORT || '8000');
