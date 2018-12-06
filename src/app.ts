import 'reflect-metadata';
import {createConnection} from 'typeorm';

import * as bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import {Request, Response} from 'express';
import log4js from 'log4js';
import path from 'path';

import routes from './routes/index';

import dataProviderRouter from './routes/dataProvider';
import hello from './routes/hello';

const log = log4js.getLogger('app');

const app = express();

app.use(log4js.connectLogger(log4js.getLogger('http'), { level: 'auto' }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use('/', hello);
app.use('/dp', dataProviderRouter);

createConnection().then(async (connection) => {
// register express routes from defined application routes
    routes.forEach((route: any) => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: void) => {
            const result = (new (route.controller as any)())[route.action](req, res, next);
            if (result instanceof Promise) {
                result.then((rslt) => rslt !== null && rslt !== undefined ? res.send(rslt) : undefined);

            } else if (result !== null && result !== undefined) {
                res.json(result);
            }
        });
    });
}).catch((error) => console.log(error));

export default app;
