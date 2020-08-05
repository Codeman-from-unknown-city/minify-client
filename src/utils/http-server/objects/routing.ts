import { cash } from "./cacheFiles";
import { ServerResponse } from "http";
import sendChunck from "./../functions/sendChunck";

export const routing: { [index: string]: any} = {
    '/': (res: ServerResponse, url: string) => {
        const index = cash.get(`${process.cwd}/static/index.js`);
        if (index) {
            sendChunck(res, url, index);
            return;
        }
    },
}