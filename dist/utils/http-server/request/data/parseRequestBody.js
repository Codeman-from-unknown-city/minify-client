"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseJSON = void 0;
const knownError_1 = __importDefault(require("../../../knownError"));
class ValidationError extends knownError_1.default {
    constructor(message) {
        super(message, 400);
    }
}
class PropertyError extends ValidationError {
    constructor(message, prop) {
        super(message);
        this.message += `(${prop})`;
    }
}
const isNativeObj = (obj) => Object.prototype.toString.call(obj) === '[object Object]';
function parseJSON(body, objInterface) {
    let data;
    try {
        data = JSON.parse(body);
    }
    catch (e) {
        throw new ValidationError('Invalid JSON');
    }
    if (!isNativeObj(data))
        throw new ValidationError('Data should be obj');
    for (let prop in objInterface) {
        if (!data[prop])
            throw new PropertyError('Missing property', prop);
        if (typeof data[prop] !== typeof objInterface[prop])
            throw new PropertyError('Invalid type of property', prop);
    }
    return data;
}
exports.parseJSON = parseJSON;
