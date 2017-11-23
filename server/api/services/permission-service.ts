import PermissionDAO from '../dao/permissionDAO';
import { ApiException } from '../exceptions';

class PermissionService {

    public async hasUserPermission(id: number, permissionName: string): Promise<boolean> {
        return PermissionDAO.hasPermission(id, permissionName);
    }

}
export default new PermissionService();
