"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function awaitData(req, callback) {
    let body = [];
    req
        .on('data', (chunk) => {
        body.push(chunk);
    })
        .on('end', () => {
        callback(null, Buffer.concat(body).toString());
    });
}
exports.default = awaitData;
