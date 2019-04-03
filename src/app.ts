import 'reflect-metadata';
import {createConnection} from 'typeorm';

import * as bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';

import log4js from 'log4js';
import path from 'path';

import flash from 'connect-flash';
import session from 'express-session';

import Auth from './auth/Auth';
import Router from './routes/Router';

const log = log4js.getLogger('app');

const app = express();

app.use(log4js.connectLogger(log4js.getLogger('http'), {level: 'auto'}));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use(flash());
app.use(session({ secret: 'svs', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

const router = new Router(app);
const auth = new Auth(app)
    .initialise()
    .localStrategy();

createConnection().then(async (connection) => {
    router.initialise();
    auth.initialiseRoutes();
}).catch((error) => console.log(error));

export default app;
