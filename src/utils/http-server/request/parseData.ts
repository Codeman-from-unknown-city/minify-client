import KnownError from "../../knownError";

class ValidationError extends KnownError {
    [i: string]: string | undefined | number;
    constructor(message: string) {
        super(message);
        this.statusCode = 400
    }
}

class PropertyError extends ValidationError {
    constructor(message: string, prop: string) {
        super(message);
        this.message += `(${prop})`;
    }
}

const isNativeObj = (obj: {[index: string]: any}): boolean => Object.prototype.toString.call(obj) === '[object Object]';

export default function parseRequestBody<T>(body: string, example: T): T {
    let data: {[index: string]: any}; 

    try {
        data = JSON.parse(body);
    } catch(e) {
        throw new ValidationError('Invalid JSON');
    }

    if ( !isNativeObj(data) ) throw new ValidationError('Data should be obj');

    for (let prop in example) {
        if (!data[prop]) throw new PropertyError('Missing property', prop);
        if (typeof data[prop] !== typeof example[prop]) throw new PropertyError('Invalid type of property', prop)
    }

    return <T>data;
}
