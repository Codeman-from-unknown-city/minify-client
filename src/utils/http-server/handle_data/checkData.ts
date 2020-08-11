/// <reference path="../../interfaces.ts" />

function isJSON(str: string): boolean | I.Data {
    try {
       return JSON.parse(str);
    } catch (e) {
        return false;
    }
}

export const isValidData = (data: string, file: boolean | I.Data  = isJSON(data)): boolean =>
    file && typeof file === 'object' && file.ext && file.code ? true : false;
