import { IncomingMessage, ServerResponse } from "http";

export default function handelPost(req: IncomingMessage, res: ServerResponse): void {
    let body: string = '';

    req.on('data', (chunk: any): void => {
        body += chunk.toString();
    });

    req.on('end', (): void => {
        console.log(body);
        
        res.end();
    })
}
