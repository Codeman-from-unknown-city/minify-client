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
const workWhithFS_1 = require("../../../workWhithFS");
const sumIp_1 = __importDefault(require("../../sumIp"));
const sendResponse_1 = __importDefault(require("../../sendResponse"));
const knownError_1 = __importDefault(require("../../../knownError"));
const routing_1 = require("../../routing");
const getRequestBody_1 = __importDefault(require("../data/getRequestBody"));
const minifyCode_1 = __importDefault(require("../../../minifyCode"));
const parseData_1 = __importDefault(require("../data/parseData"));
class BadUrlError extends knownError_1.default {
    constructor() {
        super('Unsupported URL', 400);
    }
}
const routing = new routing_1.Routing()
    .set('/delete_user_dir', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ip = req.socket.remoteAddress;
    const userId = sumIp_1.default(ip);
    yield workWhithFS_1.deleteUserDir(userId);
    sendResponse_1.default(res, 200, 'ok');
}))
    .set('/api/minify', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requestBody = yield getRequestBody_1.default(req);
    const example = { ext: '', code: '' };
    const data = parseData_1.default(requestBody, example);
    const { ext } = data;
    sendResponse_1.default(res, 200, 'OK', minifyCode_1.default(data.code, ext), ext);
}));
function handlePost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { url } = req;
        const urlHanler = routing.getHandler(url);
        if (!urlHanler)
            throw new BadUrlError();
        yield urlHanler(req, res);
    });
}
exports.default = handlePost;
