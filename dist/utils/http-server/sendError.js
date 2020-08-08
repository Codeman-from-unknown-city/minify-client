"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notBindedSendError = void 0;
exports.notBindedSendError = (res, code, reason = '', chunk = '') => res.writeHead(code, reason).end(chunk);
