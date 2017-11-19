export class ApiException extends Error {
    constructor(m: string) {
        super(m);
    }

    public getMessage(): string {
        return this.message;
    }

}
