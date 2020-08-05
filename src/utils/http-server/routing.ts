import { cash } from "./cacheFiles";

export const routing: { [index: string]: any} = {
    '/': cash.get(`${process.cwd}/static/index.js`),
}