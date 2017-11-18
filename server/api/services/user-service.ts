import UserDAO from '../dao/userDAO';
import { User } from '../models/user';
import * as Bluebird from 'bluebird';
import { Logger } from '../../config/logger';

class UserService {

    constructor() {
    }

    public findAll(): Bluebird<User[]> {
        return UserDAO.findAll();
    }

    public findById(id: number): Bluebird<User> {
        return UserDAO.findById(id);
    }

    public findOneByQuery(json: JSON): Bluebird<User> {
        return UserDAO.findOneByQuery(json);
    }

    public hasUserPermission(id: number, permissionName: string): boolean {
        return permissionName == 'user.list' ? true : false;
    }

}
export default new UserService();