export default class KnownError extends Error {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
        this.message = `${this.name}: ${message}`;
    }
}
