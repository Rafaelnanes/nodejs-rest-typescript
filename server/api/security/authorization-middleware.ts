import { Application } from 'express';
import UserService from '../services/user-service';
import * as HTTPStatus from 'http-status';
var jwt = require('jsonwebtoken');

class AuthorizationMiddleware {

    public register(app: Application): void {
        app.post("/login", (req, res) => {
            let status = HTTPStatus.UNAUTHORIZED;
            //TODO put de assert
            if (req.body.login && req.body.password) {
                let password = req.body.password;
                let query: any = {
                    login: req.body.login,
                    password: password
                };

                UserService.findOneByQuery(query).then(user => {
                    if (user) {
                        status = HTTPStatus.OK;
                        var payload = { id: user.id };
                        var token = jwt.sign(
                            payload,
                            "mySecret",
                            { expiresIn: "1h" }
                        );
                        res.setHeader("authorization", token);
                    }
                    res.sendStatus(status);
                });

            }
        });
    }
}

export default new AuthorizationMiddleware();