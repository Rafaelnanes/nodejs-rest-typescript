import UserPermissionDAO from '../dao/userPermissionDAO';
import { ApiException } from '../exceptions';

class UserPermissionService {

    public async hasUserPermission(id: number, permissionName: string): Promise<boolean> {
        return UserPermissionDAO.hasPermission(id, permissionName);
    }

    public async findPermissionsByUser(userId: number): Promise<string[]> {
        let userPermissions = await UserPermissionDAO.findPermissionsByUserId(userId);

        let permissions: string[] = [];
        userPermissions.forEach(element => {
            permissions.push(element.Permission.name);
        });

        return permissions;
    }

}
export default new UserPermissionService();
