"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleConnection = void 0;
const handleData_1 = __importDefault(require("./handle_data/handleData"));
const minifyCode_1 = __importDefault(require("../minifyCode"));
function handleConnection(socket) {
    const sendResult = (name, result) => socket.send(JSON.stringify({ name, result }));
    const sendError = sendResult.bind(null, 'Error');
    socket.onmessage = (message) => {
        let result;
        try {
            result = minifyCode_1.default(handleData_1.default(message));
        }
        catch (err) {
            sendError(err.message);
            return;
        }
        sendResult(JSON.parse(message.data).name, result);
    };
    socket.onerror = () => sendError('Sorry, something wrong');
}
exports.handleConnection = handleConnection;
