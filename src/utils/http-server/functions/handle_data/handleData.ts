/// <reference path="../../interfaces.ts" />

import isValidData from "./checkData";

export default function toProcessData(message: any): I.Data {
    const data: string = message.data;

    if (!isValidData(data)) throw new Error('Unsupported frame');
    else return JSON.parse(data);
}
