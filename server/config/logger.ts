import { Winston } from 'winston';
import * as wiston from 'winston';
let fs = require('fs');
let logDir = 'log';

class Logger {

    private static instance: Logger;
    private wiston: Winston;
    private logger: any;

    constructor() {
        this.wiston = wiston;
        this.registerLog();
    }

    public static get(): Logger {
        if (this.instance == null) {
            this.instance = new Logger();
        }
        return this.instance;
    }

    public registerLog() {
        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir);
        }

        let tsFormat = () => (new Date()).toLocaleTimeString();
        this.logger = new (this.wiston.Logger)({
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

        this.logger.info('Test info log');
        this.logger.debug('Test debug log');
    }

    public get() {
        return this.logger;
    }

}

export default new Logger().get();