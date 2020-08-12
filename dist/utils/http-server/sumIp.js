"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (ip) => {
    const isIPv6 = ip.includes(':');
    if (isIPv6)
        return ip
            .split(':')
            .reduce((sum, current) => {
            const currentInt = parseInt(current, 16);
            return isNaN(currentInt) ? 0 : sum + currentInt;
        }, 0)
            .toString();
    else
        return ip
            .split('.')
            .reduce((sum, current) => sum + +current, 0)
            .toString();
};
