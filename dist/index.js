"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const cash_1 = __importDefault(require("./utils/cash"));
const path_1 = require("path");
const get_1 = __importDefault(require("./utils/http-server/request/metods_handlers/get"));
const put_1 = __importDefault(require("./utils/http-server/request/metods_handlers/put"));
const post_1 = __importDefault(require("./utils/http-server/request/metods_handlers/post"));
const knownError_1 = __importDefault(require("./utils/knownError"));
const sendResponse_1 = __importDefault(require("./utils/http-server/sendResponse"));
const createErrorTemplate_1 = __importDefault(require("./utils/http-server/errPageTemplate/createErrorTemplate"));
const fs_1 = require("fs");
class UnforeseenSituationError extends knownError_1.default {
    constructor() {
        super('Unforeseen Situation', 500);
    }
}
class MethodNotAllowedErr extends knownError_1.default {
    constructor() {
        super('Method Not Allowed', 501);
    }
}
cash_1.default.addDirectory(path_1.join(process.cwd(), 'static'));
http_1.createServer((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { method, url } = req;
        if (!url && !req.socket.remoteAddress)
            throw new UnforeseenSituationError();
        switch (method) {
            case 'GET':
                yield get_1.default(req, res);
                break;
            case 'PUT':
                yield put_1.default(req, res);
                break;
            case 'POST':
                yield post_1.default(req, res);
                break;
            default:
                throw new MethodNotAllowedErr();
        }
    }
    catch (error) {
        if (error instanceof knownError_1.default) {
            const { statusCode, message } = error;
            if (message.includes('Page Not Found')) {
                sendResponse_1.default(res, statusCode, message, createErrorTemplate_1.default(`${statusCode} Page Not Found`), 'html');
            }
            else {
                sendResponse_1.default(res, statusCode, message);
            }
        }
        else
            throw error;
    }
    finally {
        res.end();
    }
}))
    .listen(process.env.PORT || 8000)
    .on('clientError', (err, socket) => {
    if (err.code === 'ECONNRESET' || !socket.writable)
        return;
    socket.end(createErrorTemplate_1.default(`400 Bad Request`));
});
process.on('uncaughtException', (error) => __awaiter(void 0, void 0, void 0, function* () {
    yield fs_1.promises.writeFile('../errors_logs', `${error.name}: ${error.stack}\n`);
    process.exit(1);
}));
