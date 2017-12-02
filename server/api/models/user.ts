export class User {

    public id: number;
    public login: string;
    public password: string;
    public permissions: string[];

    constructor(id?: number, login?: string, password?: string) {
        this.id = id;
        this.login = login;
        this.password = password;
    }

}