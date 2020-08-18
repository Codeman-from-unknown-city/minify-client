"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _createId;
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.users = void 0;
const createId_1 = __importDefault(require("./createId"));
const users = {};
exports.users = users;
class User {
    constructor(ip, res) {
        _createId.set(this, createId_1.default);
        const id = __classPrivateFieldGet(this, _createId).call(this, ip);
        users[ip] = id;
        res.setHeader('Set-Cookie', `id=${id}`);
    }
}
exports.User = User;
_createId = new WeakMap();
