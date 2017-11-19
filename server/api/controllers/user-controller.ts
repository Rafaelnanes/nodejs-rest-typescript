import { Application } from 'express';
import UserService from '../services/user-service';
import Auth from '../security/auth';
import Handler from '../handlers/handler';

class UserController {

    private moduleName: string = "/user";

    constructor() {
    }

    public registerRoutes(app: Application): void {
        this.findAll(app);
        this.save(app);
    }

    public findAll(app: Application): void {
        app.get(
            this.moduleName,
            Auth.authenticate(),
            (req, res) => {
                let exec = UserService.findAll();
                Handler.sendResponse(req, res, exec);
            });

    }

    public save(app: Application): void {
        app.post(
            this.moduleName,
            Auth.authenticate(),
            (req, res) => {
                let exec = UserService.save(req.body);
                Handler.sendResponse(req, res, exec);
            });

    }

}

export default new UserController();