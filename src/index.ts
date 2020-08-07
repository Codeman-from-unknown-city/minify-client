import { createServer } from "http";
import { httpOptions } from "./utils/http-server/objects/serverConfig";
import { cash } from "./utils/http-server/objects/cash";
import { join } from "path"
import httpHandler from "./utils/http-server/index";

cash.addDirectory( join(process.cwd(), 'static') );

createServer(httpHandler).listen(httpOptions);
