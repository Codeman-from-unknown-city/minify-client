"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleConnection = void 0;
const handleData_1 = __importDefault(require("./handle_data/handleData"));
const minifyCode_1 = __importDefault(require("../minifyCode"));
function handleConnection(socket) {
    socket.onmessage = (message) => {
        let file;
        try {
            file = handleData_1.default(message);
        }
        catch (err) {
            socket.send(err.message);
            return;
        }
        const result = minifyCode_1.default(file.code, file.ext);
        socket.send(result);
    };
    socket.onerror = () => socket.send('Sorry, something wrong');
}
exports.handleConnection = handleConnection;
