const model = require('../../models');
import { User } from '../models/user';

class UserDAO {

    public async save(user: User): Promise<User> {
        return model.User.build(user).save();
    }

    public async findAll(): Promise<User[]> {
        return model.User.findAll({
            order: ['login']
        });
    }

    public async findById(id: number): Promise<User> {
        return model.User.findOne({
            where: {
                id: id
            }
        }).then(userDb => {
            return new User(userDb.id, userDb.login, userDb.password);
        });
    }

    public async findOneByQuery(json: JSON): Promise<any> {
        return model.User.findOne({
            where: json,
            attributes: ['id', 'login'],
            model: User,
            raw: true
        });
    }

}

export default new UserDAO();