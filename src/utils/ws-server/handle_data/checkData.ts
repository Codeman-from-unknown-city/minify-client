/// <reference path="../../interfaces.ts" />

function isJSON(str: string): boolean {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

export default function isValidData(data: string): boolean {
    const IData: I.Data = {ext: '', code: '',};
    if (!isJSON(data)) return false;
    data = JSON.parse(data);
    if (typeof data !== 'object') return false;
    for (let prop in IData) if (data[prop] === undefined) return false;
    return true;
}
