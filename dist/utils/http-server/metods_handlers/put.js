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
const sendError_1 = require("../sendError");
const handleData_1 = __importDefault(require("../handle_data/handleData"));
const path_1 = require("path");
const sendChunck_1 = __importDefault(require("../sendChunck"));
const workWhithFS_1 = require("../workWhithFS");
const sumIp_1 = require("../sumIp");
const awaitData_1 = __importDefault(require("./../awaitData"));
function handlePut(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const sendError = sendError_1.notBindedSendError.bind(null, res);
        awaitData_1.default(req, (err, data) => __awaiter(this, void 0, void 0, function* () {
            if (err)
                throw err;
            let file;
            try {
                file = handleData_1.default(data);
            }
            catch (e) {
                sendError(400, e.message);
                return;
            }
            const ip = res.socket.remoteAddress;
            if (!ip) {
                sendError(500, 'Unforessen situation');
                return;
            }
            const userId = sumIp_1.sumIp(ip);
            yield workWhithFS_1.saveFile(userId, file);
            const fileName = file.name;
            sendChunck_1.default(res, `<a download href="${path_1.join(userId, fileName)}">${fileName}</a>`);
        }));
    });
}
exports.default = handlePut;
