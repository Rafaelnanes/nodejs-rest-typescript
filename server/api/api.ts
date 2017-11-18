import * as express from 'express';
import { Application } from 'express';
import * as bodyParser from 'body-parser';
import { Controllers } from './controllers/controllers';

class Api {

    public express: Application;

    constructor() {
        this.express = express();
        this.express.use(bodyParser.urlencoded({ extended: true }));
        this.express.use(bodyParser.json());
        this.registerControllers();
    }

    public registerControllers():void{
        new Controllers(this.express);
    }

}

export default new Api().express;