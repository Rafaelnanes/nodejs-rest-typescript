import * as http from 'http';
import Api from './api/api';
import Logger from './config/logger';

const server = http.createServer(Api);
let port = 8080;

new Logger();

server.listen(port);
server.on('listening', () => console.log(`Server is up in port ${port}`));
server.on('error', (error: NodeJS.ErrnoException) => console.log(`Error on server, ${error}`));


