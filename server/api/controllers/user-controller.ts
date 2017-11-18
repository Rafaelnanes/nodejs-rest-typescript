import { Application } from 'express';
import UserService from '../services/user-service';
import { AbstractController } from './abstract-controller';
import Auth from '../security/auth';
import * as passport from 'passport';
const model = require('../../models');

export class UserController extends AbstractController {

    private moduleName: string = "/user";

    constructor(app: Application) {
        super(app);
    }

    public registerRoutes(): void {
        this.findAll();
    }

    public findAll(): void {
        this.app.get(
            this.moduleName,
            Auth.authenticate(),
            (req, res) => {
                UserService.findAll().then(users => {
                    res.send(users);
                });
            });

    }

}