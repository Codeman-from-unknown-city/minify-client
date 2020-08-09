"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkData_1 = require("./checkData");
function toProcessData(data) {
    if (!checkData_1.isValidData(data))
        throw new Error('Unsupported frame');
    else
        return JSON.parse(data);
}
exports.default = toProcessData;
