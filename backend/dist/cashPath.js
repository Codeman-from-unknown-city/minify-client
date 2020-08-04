"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cashPath = void 0;
const joinPath = require('path').join;
exports.cashPath = joinPath(process.cwd(), '/cash');
