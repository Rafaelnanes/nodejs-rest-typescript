import * as http from 'http';
import Api from './api/api';
import { Logger } from './config/logger';
import appConfig from './config/app-config';
const models = require('./models');

Logger.get();

const server = http.createServer(Api);
let port = appConfig().serverPort;

models.sequelize.sync().then(() => {
    server.listen(port);
    server.on('listening', () => console.log(`Server is up in port ${port}`));
    server.on('error', (error: NodeJS.ErrnoException) => console.log(`Error on server, ${error}`));
});


