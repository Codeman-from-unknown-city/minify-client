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
Object.defineProperty(exports, "__esModule", { value: true });
const workWhithFS_1 = require("../workWhithFS");
const sumIp_1 = require("../sumIp");
const sendError_1 = require("../sendError");
function handlePost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('post');
        const sendError = sendError_1.notBindedSendError.bind(null, res);
        const ip = req.socket.remoteAddress;
        if (!ip) {
            sendError(500, 'Unforessen situation');
            return;
        }
        const userId = sumIp_1.sumIp(ip);
        try {
            yield workWhithFS_1.deleteUserDir(userId);
        }
        catch (e) {
            sendError(501);
        }
        finally {
            res
                .writeHead(200, 'ok')
                .end();
        }
    });
}
exports.default = handlePost;
