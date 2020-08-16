"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routing = void 0;
class Routing extends Map {
    constructor() {
        super(...arguments);
        this.getHandler = (url, result = url === '/' ?
            '/' :
            Array.from(super.keys()).find(path => path !== '/' && url.match(path))) => result ? super.get(result) : undefined;
    }
}
exports.Routing = Routing;
