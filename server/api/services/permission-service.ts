import UserPermissionDAO from '../dao/userPermissionDAO';
import { ApiException } from '../exceptions';

class UserPermissionService {

    public async hasUserPermission(id: number, permissionName: string): Promise<boolean> {
        return UserPermissionDAO.hasPermission(id, permissionName);
    }

}
export default new UserPermissionService();
