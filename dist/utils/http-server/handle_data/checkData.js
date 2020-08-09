"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidData = exports.isJSON = void 0;
function isJSON(str) {
    try {
        return JSON.parse(str);
    }
    catch (e) {
        return false;
    }
}
exports.isJSON = isJSON;
function isValidData(data) {
    const IData = { ext: '', code: '', name: '' };
    const file = isJSON(data);
    if (typeof file !== 'object')
        return false;
    for (let prop in IData)
        if (typeof file[prop] !== typeof IData[prop])
            return false;
    return true;
}
exports.isValidData = isValidData;
