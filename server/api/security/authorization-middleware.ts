import { Application } from 'express';
import UserService from '../services/user-service';
var jwt = require('jsonwebtoken');

export class AuthorizationMiddleware {

    private app: Application;

    constructor(app: Application) {
        this.app = app;
        this.register(this.app);
    }

    public register(app: Application): void {
        app.post("/login", (req, res) => {
            let status = 401;
            //TODO put de assert
            if (req.body.login && req.body.password) {
                let password = req.body.password;
                let query: any = {
                    login: req.body.login,
                    password: password
                };

                UserService.findOneByQuery(query).then(user => {
                    if (user) {
                        status = 200;
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