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
const sendError_1 = require("../../sendError");
const cash_1 = require("../../../cash");
const sendChunck_1 = __importDefault(require("../../sendChunck"));
const routing_1 = require("../../routing");
const sumIp_1 = require("../../sumIp");
const handleData_1 = __importDefault(require("../../handle_data/handleData"));
const minifyCode_1 = __importDefault(require("../../../minifyCode"));
const fs_1 = require("fs");
const awaitData_1 = __importDefault(require("../../awaitData"));
const WORK_DIR = process.cwd();
const STATIC_PATH = path_1.join(WORK_DIR, 'static');
const routing = new routing_1.Routing();
routing
    .set('/', (req, res) => {
    const sendError = sendError_1.notBindedSendError.bind(null, res);
    const indexPath = path_1.join(WORK_DIR, 'static', 'index.html');
    const index = cash_1.cash.get(indexPath);
    if (!index) {
        sendError(500, 'Server is prepare page');
        return;
    }
    sendChunck_1.default(res, index, indexPath);
})
    .set(/\/users_files\/*/, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sendError = sendError_1.notBindedSendError.bind(null, res);
    const { url } = req;
    try {
        const ip = req.socket.remoteAddress;
        if (!ip) {
            sendError(500, 'Unforessen situation');
            return;
        }
        const partsOfUrl = url.split('/');
        const filename = partsOfUrl[partsOfUrl.length - 1];
        const userId = sumIp_1.sumIp(ip);
        const filePath = path_1.join(WORK_DIR, 'users_files', userId, filename);
        const fileContent = yield fs_1.promises.readFile(filePath);
        sendChunck_1.default(res, fileContent, filePath);
    }
    catch (e) {
        sendChunck_1.default(res, 'error', 'error.html');
    }
}))
    .set('/api/minify', (req, res) => awaitData_1.default(req, (err, data) => {
    if (err)
        throw err;
    const sendError = sendError_1.notBindedSendError.bind(null, res);
    let file;
    try {
        file = handleData_1.default(data);
    }
    catch (e) {
        sendError(400, e.message);
        return;
    }
    sendChunck_1.default(res, minifyCode_1.default(file.code, file.ext));
}));
function handleGet(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { url } = req;
        const cashedFile = cash_1.cash.get(path_1.join(STATIC_PATH, url));
        const urlHandler = routing.getHandler(url);
        if (urlHandler)
            urlHandler(req, res);
        else if (cashedFile)
            sendChunck_1.default(res, cashedFile, url);
        else
            sendChunck_1.default(res, 'error', 'error.html');
    });
}
exports.default = handleGet;
