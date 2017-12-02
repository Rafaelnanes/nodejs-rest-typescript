import { Application } from 'express';
import Consts from '../config/consts';

class CORS {

    constructor() {
    }

    public register(app: Application): void {
        app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", `${req.headers.origin}`);
            res.header('Access-Control-Allow-Methods', 'POST, GET,OPTIONS, DELETE, PUT');
            res.header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With, Authorization");
            res.header("Access-Control-Expose-Headers", "Authorization");
            if ('OPTIONS' == req.method) {
                return res.send(200);
            }
            next();
        });
    }

}

export default new CORS();