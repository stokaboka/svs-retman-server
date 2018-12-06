#!/usr/bin/env node

import debug from 'debug';
import dotenv from 'dotenv';
import fs from 'fs';
import http from 'http';
import log4js from 'log4js';
import app from './app';

dotenv.config();
debug('express:server');

/**
 * make a log directory, just in case it isn't there.
 */
try {
    fs.mkdirSync('./log');
} catch (e) {
    if (e.code !== 'EEXIST') {
        console.error('Could not set up log directory, error was: ', e);
        process.exit(1);
    }
}

/**
 * Initialise log4js first, so we don't miss any log messages
 */
log4js.configure('./config/log4js.json');

const log = log4js.getLogger('startup');

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: any) {
    const out = parseInt(val, 10);

    if (isNaN(out)) {
        // named pipe
        return val;
    }

    if (out >= 0) {
        // port number
        return out;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error: any) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            log.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            log.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);

    // log.info('Express server listening on port ', server.address().port, " with pid ", process.pid );

    // @ts-ignore
    log.info(`Express server listening on port:${server.address().port} with pid:${process.pid}` );
    // @ts-ignore
    console.info(`Express server listening on port:${server.address().port} with pid:${process.pid}` );
}
