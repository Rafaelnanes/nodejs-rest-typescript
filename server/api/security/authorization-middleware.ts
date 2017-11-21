import { Application } from 'express';
import UserService from '../services/user-service';
import * as HTTPStatus from 'http-status';
import Consts from '../config/consts';
var jwt = require('jsonwebtoken');

class AuthorizationMiddleware {

    public register(app: Application): void {
        app.post("/login", async (req, res) => {
            let status = HTTPStatus.UNAUTHORIZED;
            //TODO put de assert
            if (req.body.login && req.body.password) {
                let password = req.body.password;
                let query: any = {
                    login: req.body.login,
                    password: password
                };

                let user = await UserService.findOneByQuery(query)
                if (user) {
                    status = HTTPStatus.OK;
                    var payload = { id: user.id };
                    var token = jwt.sign(
                        payload,
                        Consts.TOKEN_SECRET,
                        { expiresIn: Consts.TOKEN_EXPIRATION }
                    );
                    res.setHeader(Consts.TOKEN_HEADER, token);
                }
                res.sendStatus(status);

            }
        });
    }
}

export default new AuthorizationMiddleware();