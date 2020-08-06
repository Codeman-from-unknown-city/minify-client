"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function handelPost(req, res) {
    let body = '';
    req.on('data', (chunk) => {
        body += chunk.toString();
    });
    req.on('end', () => {
        console.log(body);
        res.end();
    });
}
exports.default = handelPost;
