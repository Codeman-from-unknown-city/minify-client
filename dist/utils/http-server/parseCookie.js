"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCookie = void 0;
;
function parseCookie(request, field) {
    const cookiesStr = request.headers.cookie;
    if (!cookiesStr) {
        return;
    }
    let cookies = {};
    const cookiesArr = cookiesStr.split(';');
    for (let cookie of cookiesArr) {
        const partsOfCookie = cookie.split('=');
        const [key, value] = partsOfCookie;
        cookies[key.trim()] = value;
    }
    return field ? cookies[field] : cookies;
}
exports.parseCookie = parseCookie;
