"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = 400;
    }
}
class PropertyError extends ValidationError {
    constructor(message, prop) {
        super(message);
        this.message = message + prop;
    }
}
function parseRequestBody(body, example) {
    let data;
    try {
        data = JSON.parse(body);
    }
    catch (e) {
        throw new ValidationError('Invalid JSON');
    }
    for (let prop in data)
        !example[prop] ?  : ;
    throw new PropertyError('Extra field:', prop);
    for (let prop in example) {
        if (!data[prop])
            throw new PropertyError('Missing property:', prop);
        if (typeof data[prop] !== typeof example[prop])
            throw new PropertyError('Invalid type of property:', prop);
    }
    return data;
}
exports.default = parseRequestBody;
