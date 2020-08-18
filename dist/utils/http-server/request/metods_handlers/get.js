"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const cash_1 = __importDefault(require("../../../cash"));
const routing_1 = require("../../routing");
const fs_1 = require("fs");
const sendResponse_1 = __importDefault(require("../../sendResponse"));
const knownError_1 = __importDefault(require("../../../knownError"));
const parseCookie_1 = require("../../parseCookie");
const users_1 = require("../../users");
class NotFoudError extends knownError_1.default {
    constructor(message) {
        super(message, 404);
    }
}
class PrepareError extends knownError_1.default {
    constructor() {
        super('Server is prepare page', 500);
    }
}
const WORK_DIR = process.cwd();
const STATIC_PATH = path_1.join(WORK_DIR, 'static');
const routing = new routing_1.Routing()
    .set('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const indexPath = path_1.join(STATIC_PATH, 'index.html');
    const index = cash_1.default.get(indexPath);
    const ip = req.socket.remoteAddress;
    if (!users_1.users[ip]) {
        new users_1.User(ip, res);
    }
    if (!index)
        throw new PrepareError();
    sendResponse_1.default(res, 200, 'OK', index, 'html');
}))
    .set(/\/users_files\/.+/, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseCookie_1.parseCookie(req, 'id');
        if (!userId) {
            res.writeHead(400, 'Bad Request');
            return;
        }
        const partsOfUrl = req.url.split('/');
        const fileName = partsOfUrl[partsOfUrl.length - 1];
        const filePath = path_1.join(WORK_DIR, 'users_files', userId, fileName);
        const fileContent = yield fs_1.promises.readFile(filePath);
        sendResponse_1.default(res, 200, 'OK', fileContent, path_1.extname(fileName).substring(1));
    }
    catch (e) {
        console.log(e);
        throw new NotFoudError('File Not Found');
    }
}));
function handleGet(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { url } = req;
        const cashedFile = cash_1.default.get(path_1.join(STATIC_PATH, url));
        const urlHandler = routing.getHandler(url);
        if (urlHandler)
            yield urlHandler(req, res);
        else if (cashedFile)
            sendResponse_1.default(res, 200, 'ok', cashedFile, path_1.extname(url).substring(1));
        else
            throw new NotFoudError('Page Not Found');
    });
}
exports.default = handleGet;
