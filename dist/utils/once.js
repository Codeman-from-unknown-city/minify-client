"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function once(fn) {
    let isWasCalled = false;
    return function (...args) {
        if (isWasCalled)
            return;
        isWasCalled = true;
        return fn(...args);
    };
}
exports.default = once;
