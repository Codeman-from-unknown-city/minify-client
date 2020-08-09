/// <reference path="../../interfaces.ts" />

function isJSON(str: string): boolean | {[index: string]: any} {
    try {
       return JSON.parse(str);
    } catch (e) {
        return false;
    }
}

function isValidData(data: string): boolean {
    const IData: {[index: string]: string} = {ext: '', code: '', name: ''};
    const file = isJSON(data);

    if (typeof file !== 'object') return false;

    for (let prop in IData) if (typeof file[prop] !== typeof IData[prop]) return false;
    
    return true;
}

export { isJSON, isValidData };
