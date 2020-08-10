"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidData = void 0;
function isJSON(str) {
    try {
        return JSON.parse(str);
    }
    catch (e) {
        return false;
    }
}
exports.isValidData = (data, file = isJSON(data)) => file && typeof file === 'object' && file.ext && file.code ? true : false;
