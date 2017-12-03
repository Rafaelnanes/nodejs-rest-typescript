const model = require('../../models');
import { User } from '../dto/user';
import { ApiException } from '../exceptions';
import Logger from '../../config/logger';

class UserDAO {

    public async save(user: User): Promise<any> {
        try {
            await model.User.build(user).save();
        } catch (error) {
            Logger.error('Error persisting the user, cause: ', error.message);
            throw new ApiException(500, error.message);
        }
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
            },
            attributes: ['id', 'login', 'profileId'],
            model: User,
            raw: true
        });
    }

    public async findOneByQuery(json: JSON): Promise<User> {
        return model.User.findOne({
            where: json,
            attributes: ['id', 'login', 'profileId'],
            model: User,
            raw: true
        });
    }

}

export default new UserDAO();