const model = require('../../models');
import * as Bluebird from 'bluebird';
import { User } from './model';

export class UserDAO {

    public findAll(): Bluebird<User[]> {
        return model.user.findAll({
            order: ['login']
        });
    }
}