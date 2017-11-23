const model = require('../../models');
import { Permission } from '../models/permission';
import { User } from '../models/user';

class PermissionDAO {

    public async hasPermission(userId: number, permissionName: string): Promise<boolean> {
        return model.permission.findAll({
            where: {
                name: permissionName
            },
            include: [{
                model: model.user
            }]
        }).then(permission => {
            console.log('chegou4');
            return permission != null;
        }).catch(res =>{
            console.log('chegou5', res);
        })
        
    }

}

export default new PermissionDAO();