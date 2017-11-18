const model = require('../../models');
import * as Bluebird from 'bluebird';
import { User } from '../models/user';

class UserDAO {

    public findAll(): Bluebird<User[]> {
        return model.user.findAll({
            order: ['login']
        });
    }

    public findById(id: number): Bluebird<User> {
        return model.user.findAll({
            where: {
                id: id
            }
        }).then(userDb => {
            return new User(userDb.id, userDb.login, userDb.password);
        });
    }

    public findOneByQuery(json: JSON): Bluebird<User> {
        return model.user.findOne({
            where: json,
            attributes: ['id', 'login'],
            model : User,
            raw : true
        });
    }

}

export default new UserDAO();