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
const sendChunck_1 = __importDefault(require("../../sendChunck"));
const workWhithFS_1 = require("../../../workWhithFS");
const sumIp_1 = require("../../sumIp");
const getRequestBody_1 = __importDefault(require("../getRequestBody"));
const parseData_1 = __importDefault(require("../parseData"));
function handlePut(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const requestBody = yield getRequestBody_1.default(req);
        const expample = { name: '', ext: '', code: '' };
        const file = parseData_1.default(requestBody, expample);
        const ip = req.socket.remoteAddress;
        const userId = sumIp_1.sumIp(ip);
        yield workWhithFS_1.saveFile(userId, file);
        const fileName = file.name;
        sendChunck_1.default(res, `<a download href="${path_1.join('users_files', fileName)}">${fileName}</a>`);
    });
}
exports.default = handlePut;
