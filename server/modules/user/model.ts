export class User {

    private id: number;
    private login: string;
    private password: string;

    public get $login(): string {
        return this.login;
    }

    public set $login(value: string) {
        this.login = value;
    }

    public get $password(): string {
        return this.password;
    }

    public set $password(value: string) {
        this.password = value;
    }

    public get $id(): number {
        return this.id;
    }

    public set $id(value: number) {
        this.id = value;
    }

}