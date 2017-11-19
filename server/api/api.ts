import * as express from 'express';
import { Application } from 'express';
import * as bodyParser from 'body-parser';
import UserController from './controllers/user-controller';
import Auth from './security/auth';
import AuthorizationMiddleware  from './security/authorization-middleware';
import Handler from './handlers/handler';

class Api {

    public app: Application;

    constructor() {
        this.app = express();
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(Auth.initialize());
        this.app.use(Handler.errorHandlerApi);
        AuthorizationMiddleware.register(this.app);
        this.registerControllers();
    }

    public registerControllers(): void {
        UserController.registerRoutes(this.app);
    }

}

export default new Api().app;