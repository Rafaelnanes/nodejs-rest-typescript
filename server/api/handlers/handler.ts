import { Request, Response, ErrorRequestHandler, NextFunction } from 'express';
import * as HTTPStatus from 'http-status';
import Logger from '../../config/logger';
import * as Promisse from 'bluebird';

class Handler {

    public errorHandlerApi(error: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) {
        Logger.get().info(`Internal error caused by: ${error}`);
        res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
            status: 0,
            message: 'Internal Error'
        });
    }

    public sendResponse(req: Request, res: Response, promise: Promisse<any>) {
        promise.then((obj) => {
            res.send({
                status: 1,
                data: obj
            });
        }).
            catch((error) => {
                res.send({
                    status: 0,
                    message: error.message
                });
            });
    }
}

export default new Handler();