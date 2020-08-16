import { ServerResponse } from "http";
import checkedIncomingMessage from "./checkedIncomingMessage";

interface IRoutingHandler {
    (req: checkedIncomingMessage, res: ServerResponse): Promise<void>;
}

class Routing extends Map<string | RegExp, IRoutingHandler> {
    getHandler = (
        url: string,
        result: string | RegExp | undefined = url === '/' ? 
        '/' : 
        Array.from(super.keys()).find(path => path !== '/' && url.match(path))
    ): IRoutingHandler | undefined => result ? super.get(result) : undefined;
}

export { IRoutingHandler , Routing }
