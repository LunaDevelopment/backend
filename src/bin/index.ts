// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import { Server as IOServer } from 'socket.io';
import { app } from '../app';
import Debug from 'debug';
import http from 'http';

const server = http.createServer(app);
const debug = Debug('myapp:server');
const port = process.env.port;
const io = new IOServer();

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('../socket.io/socket')(io, server);

server
    .listen(port, () => debug(`Listening on ${port}`))
    .on('error', function (error) {
        if (error.message.includes('EACCES')) console.error(`Port ${port} requires elevated privileges`);
        else if (error.message.includes('EADDRINUSE')) console.error(`Port ${port} is already in use`);
        else throw error;
        process.exit(1);
    });
