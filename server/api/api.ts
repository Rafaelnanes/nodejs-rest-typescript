import * as express from 'express';
import { Application } from 'express';
import * as bodyParser from 'body-parser';

class Api {

    public express: Application;

    constructor() {
        this.express = express();
        this.express.use(bodyParser.urlencoded({ extended: true }));
        this.express.use(bodyParser.json());

        this.express.get('/', (req, res) =>{
            res.send('ok');
        });
    }
    
}

export default new Api().express;