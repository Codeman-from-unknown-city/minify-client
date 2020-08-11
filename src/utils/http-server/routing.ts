import { ServerResponse } from "http";
import checkedIncomingMessage from "../../IncomingMessage";

interface IRoutingHandler {
    (req: checkedIncomingMessage, res: ServerResponse): void;
}

class Routing extends Map<string | RegExp, IRoutingHandler> {
    getHandler(url: string): IRoutingHandler | void {
        if (url === '/') return super.get('/');

        for (let key of super.keys()) if (url.match(key)) return super.get(key);
    }
}

export { IRoutingHandler , Routing }
