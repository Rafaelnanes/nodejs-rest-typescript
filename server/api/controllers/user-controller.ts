import { Application } from 'express';
import UserService from '../services/user-service';
import Auth from '../security/auth';
import * as passport from 'passport';
const model = require('../../models');

class UserController  {

    private moduleName: string = "/user";

    constructor() {
    }

    public registerRoutes(app: Application): void {
        this.findAll(app);
    }

    public findAll(app: Application): void {
        app.get(
            this.moduleName,
            Auth.authenticate(),
            (req, res) => {
                UserService.findAll().then(users => {
                    res.send(users);
                });
            });

    }

}

export default new UserController();