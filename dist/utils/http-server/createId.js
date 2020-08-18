"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
function random(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}
function sumIp(ip) {
    const isIPv6 = ip.includes(':');
    const result = isIPv6
        ? ip
            .split(':')
            .reduce((sum, current) => {
            const currentInt = parseInt(current, 16);
            return isNaN(currentInt) ? 0 : sum + currentInt;
        }, 0)
        : ip
            .split('.')
            .reduce((sum, current) => sum + +current, 0);
    return result.toString();
}
function createId(ip) {
    let id = '';
    for (let counter = 0; counter < 12; counter++) {
        const i = random(0, 25);
        id += random(0, 10) <= 5 ? ALPHABET[i] : ALPHABET[i].toUpperCase();
    }
    return id + sumIp(ip);
}
exports.default = createId;
