const model = require('../../models');
import { Permission } from '../dto/permission';
import { User } from '../dto/user';

class ProfilePermissionDAO {

    public async hasPermission(profileId: number, permissionName: string): Promise<boolean> {
        return model.ProfilePermission.findAll({
            where: {
                profileId: profileId
            },
            include: [{
                model: model.Permission,
                where: { name: permissionName }
            }]
        }).then(permission => {
            return permission != null && permission.length > 0;
        })

    }

    public async findPermissionsByUser(user: User): Promise<any> {
        return model.ProfilePermission.findAll({
            where: {
                profileId: user.profileId
            },
            include: [{
                model: model.Profile,
                where: { id: user.profileId }
            },
            {
                model: model.Permission
            }]
        });

    }

}

export default new ProfilePermissionDAO();