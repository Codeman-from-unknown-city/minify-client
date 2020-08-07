"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.once = void 0;
exports.once = (fn, isWasCalled = false) => (...args) => !isWasCalled ? (isWasCalled = true, fn(...args)) : undefined;
