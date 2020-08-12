"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class KnownError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = this.constructor.name;
        this.message = `${this.name}: ${message}`;
        this.statusCode = statusCode;
    }
}
exports.default = KnownError;
