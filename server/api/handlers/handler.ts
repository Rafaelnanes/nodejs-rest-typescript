import { Request, Response, ErrorRequestHandler, NextFunction } from 'express';
import * as HTTPStatus from 'http-status';
import Consts from '../config/consts';
import Logger from '../../config/logger';

class Handler {

    public errorHandlerApi(error: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) {
        Logger.info(`Internal error caused by: ${error}`);
        res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
            message: 'Internal Error'
        });
    }

    public sendResponse(req: Request, res: Response, promise: Promise<any>) {
        promise.then((obj) => {
            res.send({
                data: obj
            });
        }).
            catch((error) => {
                res.status(error.status).send({
                    message: error.message
                });
            });
    }
}

export default new Handler();