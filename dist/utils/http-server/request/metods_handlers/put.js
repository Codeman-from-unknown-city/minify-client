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
const workWhithFS_1 = require("../../../workWhithFS");
const getRequestBody_1 = __importDefault(require("../data/getRequestBody"));
const parseRequestBody_1 = require("../data/parseRequestBody");
const sendResponse_1 = __importDefault(require("../../sendResponse"));
const parseCookie_1 = require("../../parseCookie");
function handlePut(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = parseCookie_1.parseCookie(req, 'id');
        if (!userId) {
            res.writeHead(400, 'Bad Request');
            return;
        }
        const requestBody = yield getRequestBody_1.default(req);
        const objInterface = { name: '', ext: '', code: '' };
        const file = parseRequestBody_1.parseJSON(requestBody, objInterface);
        yield workWhithFS_1.saveFile(userId, file);
        const fileName = file.name;
        sendResponse_1.default(res, 201, 'Created');
        res.setHeader('Location', path_1.join('users_files', fileName));
    });
}
exports.default = handlePut;
