import { Application } from 'express';
import { UserController } from '../../modules/user/index';

export class Controllers {

    private app: Application;

    constructor(app: Application) {
        this.app = app;
        this.registerUser(this.app);
    }

    private registerUser(app: Application): void {
        let userRoutes: UserController = new UserController();
        userRoutes.registerRoutes(app);
    }

}