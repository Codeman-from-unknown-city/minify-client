import KnownError from "../../../knownError";

class ValidationError extends KnownError {
    constructor(message: string) {
        super(message, 400);
    }
}

class PropertyError extends ValidationError {
    constructor(message: string, prop: string) {
        super(message);
        this.message += `(${prop})`;
    }
}

const isNativeObj = (obj: {[index: string]: any}): boolean => Object.prototype.toString.call(obj) === '[object Object]';

export function parseJSON<T>(body: string, objInterface: T): T {
    let data: {[index: string]: any}; 

    try {
        data = JSON.parse(body);
    } catch(e) {
        throw new ValidationError('Invalid JSON');
    }

    if ( !isNativeObj(data) ) throw new ValidationError('Data should be obj');

    for (let prop in objInterface) {
        if (!data[prop]) throw new PropertyError('Missing property', prop);
        if (typeof data[prop] !== typeof objInterface[prop]) throw new PropertyError('Invalid type of property', prop)
    }

    return <T>data;
}
