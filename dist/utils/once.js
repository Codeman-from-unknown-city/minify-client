"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function once(fn) {
    let isWasCalled = false;
    return function () {
        if (isWasCalled)
            return;
        fn.apply(null, arguments);
        isWasCalled = true;
    };
}
exports.default = once;
