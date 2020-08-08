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
const sendError_1 = require("../sendError");
const cash_1 = require("../../cash");
const sendChunck_1 = __importDefault(require("../sendChunck"));
const fs_1 = require("fs");
const STATIC_PATH = path_1.join(process.cwd(), 'static');
function handleGet(res, url) {
    return __awaiter(this, void 0, void 0, function* () {
        const sendError = sendError_1.notBindedSendError.bind(null, res);
        if (!url) {
            sendError(500, 'Unforessen situation');
            return;
        }
        if (url === '/') {
            const indexPath = path_1.join(STATIC_PATH, 'index.html');
            const index = cash_1.cash.get(indexPath);
            if (!index) {
                sendError(500, 'Page prepare cash');
                return;
            }
            sendChunck_1.default(res, index, indexPath);
            return;
        }
        const cashedFile = cash_1.cash.get(path_1.join(STATIC_PATH, url));
        if (cashedFile)
            sendChunck_1.default(res, cashedFile, url);
        else
            try {
                const filePath = path_1.join(STATIC_PATH, url);
                const fileContent = yield fs_1.promises.readFile(filePath);
                sendChunck_1.default(res, fileContent, filePath);
            }
            catch (e) {
                sendChunck_1.default(res, 'error.html', 'error');
            }
    });
}
exports.default = handleGet;