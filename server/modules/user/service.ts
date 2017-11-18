import { UserDAO } from './dao';
import { User } from './model';
import * as Bluebird from 'bluebird';

export class UserService {

    private userDAO: UserDAO;

    constructor() {
        this.userDAO = new UserDAO();
    }

    public findAll(): Bluebird<User[]> {
        return this.userDAO.findAll();
    }

}