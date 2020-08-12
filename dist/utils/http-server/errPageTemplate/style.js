"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const minifyCode_1 = __importDefault(require("../../minifyCode"));
exports.default = minifyCode_1.default(`
.err {
    margin-top: 35vh;
    text-align: center;
}
.return {
    text-decoration: none;
    color: #e53935;
}
`, 'css');
