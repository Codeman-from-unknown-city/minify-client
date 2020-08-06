"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const get_1 = __importDefault(require("./requestHandlers/get"));
function httpHandler(req, res) {
    const { url, method } = req;
    if (method === 'GET')
        get_1.default(res, url);
}
exports.default = httpHandler;
