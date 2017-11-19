const model = require('../../models');
import * as Promise from 'bluebird';
import { User } from '../models/user';

class UserDAO {

    public save(user:User):Promise<User>{
        return model.user.build(user).save();
    }

    public findAll(): Promise<User[]> {
        return model.user.findAll({
            order: ['login']
        });
    }

    public findById(id: number): Promise<User> {
        return model.user.findAll({
            where: {
                id: id
            }
        }).then(userDb => {
            return new User(userDb.id, userDb.login, userDb.password);
        });
    }

    public findOneByQuery(json: JSON): Promise<any> {
        return model.user.findOne({
            where: json,
            attributes: ['id', 'login'],
            model : User,
            raw : true
        });
    }

}

export default new UserDAO();