import { Request, Response, ErrorRequestHandler, NextFunction } from 'express';
import * as HTTPStatus from 'http-status';
import Consts from '../config/consts';
import Logger from '../../config/logger';

class Handler {

    public errorHandlerApi(error: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) {
        Logger.info(`Internal error caused by: ${error}`);
        res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
            status: Consts.STATUS_INTERNAL_ERROR,
            message: 'Internal Error'
        });
    }

    public sendResponse(req: Request, res: Response, promise: Promise<any>) {
        promise.then((obj) => {
            res.send({
                status: Consts.STATUS_SUCCESS,
                data: obj
            });
        }).
            catch((error) => {
                res.send({
                    status: Consts.STATUS_ERROR,
                    message: error.message
                });
            });
    }
}

export default new Handler();