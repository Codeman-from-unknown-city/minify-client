import { ServerResponse } from "http";
import checkedIncomingMessage from "./checkedIncomingMessage";

interface IRoutingHandler {
    (req: checkedIncomingMessage, res: ServerResponse): Promise<void>;
}

class Routing extends Map<string | RegExp, IRoutingHandler> {
    getHandler(url: string): IRoutingHandler | undefined {
        const ROOT_PATH = '/';

        if (url === ROOT_PATH) return super.get(ROOT_PATH);

        for (let key of super.keys()) {
            if (key === ROOT_PATH) continue;
            if (url.match(key)) return super.get(key);
        }
    }
}

export { IRoutingHandler , Routing }
