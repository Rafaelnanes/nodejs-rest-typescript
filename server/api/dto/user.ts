export class User {

    public id: number;
    public login: string;
    public password: string;
    public profileId: number;
    public permissions: string[];

    constructor(id?: number, login?: string, password?: string, profileId?: number) {
        this.id = id;
        this.login = login;
        this.password = password;
        this.profileId = profileId;
    }

}