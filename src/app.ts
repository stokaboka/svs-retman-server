import 'reflect-metadata';
import {createConnection} from 'typeorm';

import * as bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import {Request, Response} from 'express';
import log4js from 'log4js';
import path from 'path';

import flash from 'connect-flash';
import session from 'express-session';

import passport from 'passport';
import passportLocal from 'passport-local';

const LocalStrategy = passportLocal.Strategy;

import AuthController from './model/controller/AuthController';
import routes from './routes/index';

const log = log4js.getLogger('app');

const app = express();

app.use(log4js.connectLogger(log4js.getLogger('http'), {level: 'auto'}));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use(flash());
app.use(session({secret: 'cats'}));
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

passport.serializeUser((user: any, done: any) => {
    done(null, user.login);
});

passport.deserializeUser(async (login: any, done) => {
    const authController = new AuthController();
    try {
        const user = await authController.findByLogin(login);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

passport.use(new LocalStrategy(
    {
        usernameField: 'login',
        passwordField: 'password',
    },
    async (username, password, done) => {

        console.log('LocalStrategy', username, password);

        const authController = new AuthController();
        try {
            const user = await authController.findByLogin(username);
            if (user) {
                if (AuthController.comparePassword(user.password, password)) {
                    console.log('LocalStrategy user', user);
                    return done(null, user);
                } else {
                    return done(null, false, {message: 'Incorrect password.'});
                }

            } else {
                return done(null, false, {message: 'Incorrect username.'});
            }
        } catch (err) {
            return done(err);
        }
    },
));

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

// , {
//         successRedirect: '/',
//             failureRedirect: '/login',
//             failureFlash: true,
//     }

    app.post('/login',
        passport.authenticate('local'),
        (req, res) => {
            res.json(res.req.user);
        },
    );

}).catch((error) => console.log(error));

export default app;
