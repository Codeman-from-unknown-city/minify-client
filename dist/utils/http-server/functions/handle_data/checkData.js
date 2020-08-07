"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isJSON(str) {
    try {
        JSON.parse(str);
    }
    catch (e) {
        return false;
    }
    return true;
}
function isValidData(data) {
    const IData = { ext: '', code: '', };
    if (!isJSON(data))
        return false;
    data = JSON.parse(data);
    if (typeof data !== 'object')
        return false;
    for (let prop in IData)
        if (data[prop] === undefined)
            return false;
    return true;
}
exports.default = isValidData;
