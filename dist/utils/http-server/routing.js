"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routing = void 0;
class Routing extends Map {
    getHandler(url) {
        const ROOT_PATH = '/';
        if (url === ROOT_PATH)
            return super.get(ROOT_PATH);
        for (let key of super.keys()) {
            if (key === ROOT_PATH)
                continue;
            if (url.match(key))
                return super.get(key);
        }
    }
}
exports.Routing = Routing;
