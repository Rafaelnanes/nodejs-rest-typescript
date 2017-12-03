import UserPermissionDAO from '../dao/profile-permission-DAO';
import { ApiException } from '../exceptions';
import { User } from '../dto/user';

class UserPermissionService {

    public async hasUserPermission(id: number, permissionName: string): Promise<boolean> {
        return UserPermissionDAO.hasPermission(id, permissionName);
    }

    public async findPermissionsByUser(user: User): Promise<string[]> {
        let userPermissions = await UserPermissionDAO.findPermissionsByUser(user);

        let permissions: string[] = [];
        userPermissions.forEach(element => {
            permissions.push(element.Permission.name);
        });

        return permissions;
    }

}
export default new UserPermissionService();
