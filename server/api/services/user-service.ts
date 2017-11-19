import UserDAO from '../dao/userDAO';
import { User } from '../models/user';
import * as Promisse from 'bluebird';
import { ApiException } from '../exceptions';

class UserService {

    public save(user: User): Promisse<any> {
        let query = JSON.parse(`{ "login": "${user.login}" }`);
        return UserDAO.findOneByQuery(query).then(userDB => {
            if (userDB == null) {
                return UserDAO.save(user);
            } else {
                throw new ApiException('User already exists');
            }
        });
    }

    public findAll(): Promisse<User[]> {
        return UserDAO.findAll();
    }

    public findById(id: number): Promisse<User> {
        return UserDAO.findById(id);
    }

    public findOneByQuery(json: JSON): Promisse<User> {
        return UserDAO.findOneByQuery(json);
    }

    public hasUserPermission(id: number, permissionName: string): boolean {
        return permissionName == 'user.list' ? true : false;
    }

}
export default new UserService();
