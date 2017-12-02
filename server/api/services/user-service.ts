import UserDAO from '../dao/userDAO';
import { User } from '../models/user';
import { ApiException } from '../exceptions';
import Utils from '../config/utils';

class UserService {

    public async save(user: User): Promise<any> {
        let query = JSON.parse(`{ "login": "${user.login}" }`);
        let userDb: User = await UserDAO.findOneByQuery(query);
        if (userDb == null) {
            user.password = Utils.generatePassword(user.password);
            return UserDAO.save(user);
        } else {
            throw new ApiException(409, 'User already exists');
        }
    }

    public async findAll(): Promise<User[]> {
        return UserDAO.findAll();
    }

    public async findById(id: number): Promise<User> {
        return UserDAO.findById(id);
    }

    public async findOneByQuery(json: JSON): Promise<User> {
        return UserDAO.findOneByQuery(json);
    }

}
export default new UserService();
