import { Application } from 'express';
import UserService from '../services/user-service';
import PermissionService from '../services/permission-service';
import * as HTTPStatus from 'http-status';
import Consts from '../config/consts';
import Utils from '../config/utils';
import Logger from '../../config/logger';
var jwt = require('jsonwebtoken');

class AuthorizationMiddleware {

    public register(app: Application): void {
        app.post("/login", async (req, res) => {
            let status = HTTPStatus.UNAUTHORIZED;
            //TODO put de assert
            if (req.body.login && req.body.password) {
                let password = Utils.generatePassword(req.body.password);
                let query: any = {
                    login: req.body.login,
                    password: password
                };

                let user = await UserService.findOneByQuery(query);
                if (user) {
                    status = HTTPStatus.OK;
                    let payload = { id: user.id };
                    let token = jwt.sign(
                        payload,
                        Consts.TOKEN_SECRET,
                        { expiresIn: Consts.TOKEN_EXPIRATION }
                    );
                    let permissions = await PermissionService.findPermissionsByUser(user.id);
                    user.permissions = permissions;

                    let encodedUser = new Buffer(JSON.stringify(user)).toString('base64');
                    res.setHeader(Consts.TOKEN_HEADER, encodedUser + '||' + token);
                }
                res.sendStatus(status);

            }
        });
    }
}

export default new AuthorizationMiddleware();