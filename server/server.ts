import * as http from 'http';
import Api from './api/api';
import Logger from './config/logger';
import appConfig from './config/app-config';
import SequelizeMigration from './config/sequelize-migration';

const models = require('./models');

const server = http.createServer(Api);
let port = appConfig().serverPort;

models.sequelize.sync().then(() => {
    server.listen(port);
    server.on('listening', () => {
        Logger.info(`Server is up in port ${port}`);
        SequelizeMigration.migrateOnDev();
    });
    server.on('error', (error: NodeJS.ErrnoException) => console.log(`Error on server, ${error}`));

});

export default server;

