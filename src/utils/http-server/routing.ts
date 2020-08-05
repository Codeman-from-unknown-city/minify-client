import { cash } from "./cacheFiles";

export const routing = {
    '/': cash.get(`${process.cwd}/static/index.js`),
}