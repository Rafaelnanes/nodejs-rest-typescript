export class ApiException extends Error {

    private status: number;

    constructor(status: number, m: string) {
        super(m);
        this.status = status;
    }


    public getMessage(): string {
        return this.message;
    }

}
