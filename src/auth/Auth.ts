// https://medium.com/front-end-weekly/learn-using-jwt-with-passport-authentication-9761539c4314

import jwt from 'jsonwebtoken';
import passport from 'passport';
import passportLocal from 'passport-local';
const LocalStrategy = passportLocal.Strategy;

import {NextFunction, Request, Response} from 'express';
import AuthController from '../model/controller/AuthController';

export default class Auth {
    private app: any;

    constructor(app: any) {
        this.app = app;
    }

    public initialise() {
        this.app.use(passport.initialize());
        this.app.use(passport.session());

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
        return this;
    }

    public initialiseRoutes() {
        this.app.post('/login',
            passport.authenticate('local'),
            (req: Request, res: Response, next: NextFunction) => {
                res.json(res.req.user);
                if (next) {
                    next();
                }
            },
        );
    }

    public localStrategy() {
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
                            return done(null, AuthController.fixObject(user));
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
        return this;
    }
}
