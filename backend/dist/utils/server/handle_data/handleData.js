"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const checkData_1 = __importDefault(require("./checkData"));
function toProcessData(message) {
    const data = message.data;
    if (!checkData_1.default(data))
        throw new Error('Unsupported frame');
    else
        return JSON.parse(data);
}
exports.default = toProcessData;
