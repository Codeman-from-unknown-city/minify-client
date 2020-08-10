/// <reference path="../../interfaces.ts" />

function isJSON(str: string): boolean | I.Data | I.File {
    try {
       return JSON.parse(str);
    } catch (e) {
        return false;
    }
}

// function isValidData(data: string): boolean {
//     const file = isJSON(data);
//     const checkCondition: boolean = typeof file === 'object' && file.ext && file.code;

//     if (typeof file !== 'object') return false;
    
    
//     return true;
// }

export const isValidData = (data: string, file: boolean | I.Data | I.File = isJSON(data)): boolean =>
    file && typeof file === 'object' && file.ext && file.code ? true : false;
