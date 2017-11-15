import { Winston } from 'winston';
import * as wiston from 'winston';
let fs = require('fs');
let logDir = 'log';

class Logger {

    public wiston: Winston;
    public logger: Logger;

    constructor() {
        this.wiston = wiston;
        this.registerLog();
    }

    public registerLog() {
        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir);
        }

        let tsFormat = () => (new Date()).toLocaleTimeString();
        let logger = new (this.wiston.Logger)({
            transports: [
                // colorize the output to the console
                new (wiston.transports.Console)({
                    timestamp: tsFormat,
                    colorize: true,
                    level: 'debug'
                }),
                new (require('winston-daily-rotate-file'))({
                    filename: logDir + '/-api.log',
                    timestamp: tsFormat,
                    datePattern: 'yyyy-MM-dd',
                    prepend: true,
                    level: 'info'
                })
            ]
        });

        logger.info('Test info log');
        logger.debug('Test debug log');
    }

    public getLogger(): Logger {
        return this.logger;
    }
}

export default Logger;