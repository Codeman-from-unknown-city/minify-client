export default class KnownError extends Error {
    statusCode: number
    constructor(message: string, statusCode: number) {
        super(message);
        this.name = this.constructor.name;
        this.message = `${this.name}: ${message}`;
        this.statusCode = statusCode;
    }
}
