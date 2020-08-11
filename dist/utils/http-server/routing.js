"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routing = void 0;
class Routing extends Map {
    getHandler(url) {
        if (url === '/')
            return super.get('/');
        for (let key of super.keys())
            if (url.match(key))
                return super.get(key);
    }
}
exports.Routing = Routing;
