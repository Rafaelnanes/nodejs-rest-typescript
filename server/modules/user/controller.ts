import { Application } from 'express';
import { AppController } from 'api-route-interface';
import { UserService } from './service';
const model = require('../../models');

export class UserController implements AppController {

    private moduleName: string = "/user";
    private userService: UserService;
    constructor() {
        this.userService = new UserService();
    }

    registerRoutes(app: Application): void {
        app.get(this.moduleName, (req, res) => {
            this.userService.findAll().then(users => {
                res.send(users);
            });
        });
    }

}