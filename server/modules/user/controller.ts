import { Application } from 'express';
import { AppController } from 'api-route-interface';
const model = require('../../models');

export class UserController implements AppController {

    private moduleName: string = "/user";

    constructor() { }

    registerRoutes(app: Application): void {
        app.get(this.moduleName, (req, res) => {
            model.user.findAll({
                order: ['login']
              }).then(users =>{
                  res.send(users);
              });
        });
    }

}