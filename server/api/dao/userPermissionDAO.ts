const model = require('../../models');
import { Permission } from '../models/permission';
import { User } from '../models/user';

class UserPermissionDAO {

    public async hasPermission(userId: number, permissionName: string): Promise<boolean> {
        return model.UserPermission.findAll({
            where: {
                userId: userId
            },
            include: [{
                model: model.Permission,
                where: { name: permissionName }
            }]
        }).then(permission => {
            return permission != null && permission.length > 0;
        })
        
    }

}

export default new UserPermissionDAO();