"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function handelPost(req) {
    let body;
    req.on('data', (chunk) => {
        body + chunk;
    });
    req.on('end', () => {
        console.log(body);
    });
}
exports.default = handelPost;
