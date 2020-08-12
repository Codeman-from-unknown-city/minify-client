import { IncomingMessage } from "http";
import { Socket } from "net";

interface checkedSoket extends Socket {
    remoteAddress: string
}

export default interface checkedIncomingMessage extends IncomingMessage {
    url: string
    socket: checkedSoket
}
