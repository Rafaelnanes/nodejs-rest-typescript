import * as express from 'express';
import { Application } from 'express';
import * as bodyParser from 'body-parser';
import { UserController } from './controllers';
import Auth from './security/auth';
import { AuthorizationMiddleware } from './security/authorization-middleware';

class Api {

    public app: Application;

    constructor() {
        this.app = express();
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(Auth.initialize());
        new AuthorizationMiddleware(this.app);
        this.registerControllers();
    }

    public registerControllers(): void {
        new UserController(this.app).registerRoutes();
    }

}

export default new Api().app;