/// <reference path="../interfaces.ts" />

import toProcessData from "./handle_data/handleData";
import minify from "../minifyCode";


export function handleConnection(socket: WebSocket): void {
    const sendResult = (name: string, result: string): void => socket.send(JSON.stringify({ name, result }));
    const sendError = sendResult.bind(null, 'Error');

    socket.onmessage = (message: any): void => {
        let result: string;
        try {
            result = minify(toProcessData(message));
        } catch (err) {
            sendError(err.message);
            return;
        } 
        sendResult(JSON.parse(message.data).name, result);
    }

    socket.onerror =  (): void => sendError('Sorry, something wrong');
}
