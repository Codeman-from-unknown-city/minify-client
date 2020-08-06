import { IncomingMessage } from "http";

export default function handelPost(req: IncomingMessage): void {
    let body: string;

    req.on('data', (chunk: any): void => {
        body + chunk;
    });

    req.on('end', (): void => {
        console.log(body);
    })
}