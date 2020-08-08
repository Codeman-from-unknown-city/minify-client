/// <reference path="../../../interfaces.ts" />

import isValidData from "./checkData";

export default function toProcessData(data: string): I.Data {
    if (!isValidData(data)) throw new Error('Unsupported frame');
    else return JSON.parse(data);
}
