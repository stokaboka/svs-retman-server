// https://medium.com/front-end-weekly/learn-using-jwt-with-passport-authentication-9761539c4314

import jwt from 'jsonwebtoken';
import passport from 'passport';
import passportLocal from 'passport-local';

const LocalStrategy = passportLocal.Strategy;

import passportJWT from 'passport-jwt';

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

import {NextFunction, Request, Response} from 'express';

import AuthController from '../model/controller/AuthController';
import UsersController from '../model/controller/UsersController';

export default class Auth {

    public passport = passport;

    private app: any;
    private authController: AuthController;

    private secretOrKey = 'svoboda_slova';
    private subject = 'http://lingvo-svoboda.ru/';
    private audience = 'http://lingvo-svoboda.ru/';
    private issuer = 'http://orangem.me/';

    private localStrategyOpts = {
        usernameField: 'login',
        passwordField: 'password',
    };

    private signOpts = {
        // issuer: this.issuer,
        // subject: this.subject,
        expiresIn: '1d',
    };

    private jwtStrategyOpts = {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: this.secretOrKey,
        // issuer: this.issuer,
        // audience: this.audience,
    };

    private verifyhOpts = {
        // issuer: this.issuer,
        ignoreExpiration: false,
        // subject: this.subject,
        clockTolerance: 5,
        maxAge: '1d',
    };

    private STATUS = {
        forbidden: 'Forbidden',
        unauthorized: 'Unauthorized',
    };

    private MESSAGES = {
        forbidden: {message: 'Forbidden'},
        unauthorized: {message: 'Unauthorized'},
        notFound: {message: 'User not found'},
        othersError: {message: 'Something is not right'},
    };

    constructor(app: any) {
        this.app = app;
    }

    public initialise() {

        this.authController = new AuthController();

        this.app.use(passport.initialize());
        this.app.use(passport.session());

        passport.serializeUser((user: any, done: any) => {
            done(null, user.login);
        });

        passport.deserializeUser(async (login: any, done) => {
            try {
                const user = await this.authController.findByLogin(login);
                done(null, user);
            } catch (err) {
                done(err, null);
            }
        });
        return this;
    }

    public initRoutes() {

        this.app.post('/register', async (req: Request, res: Response, next: NextFunction) => {
            const usersController: UsersController = new UsersController();
            const reg: any = await usersController.register(req, res, next);
            if (reg.error) {
                return res.json({user: null, token: '', error: reg.error});
            } else {
                const user = reg.user;
                req.login(user, {session: false}, (error) => {
                    if (error) {
                        res.send(error);
                    }
                    // generate a signed son web token with the contents of user object and return it in the response
                    const token = jwt.sign({id: user.id}, this.secretOrKey, this.signOpts);
                    return res.json({user, token, error: null});
                });
            }
        });

        this.app.post('/login', async (req: Request, res: Response, next: NextFunction) => {

            if (req.headers && req.headers.authorization) {
                const token = req.headers.authorization.substr(7);
                try {
                    const verifiedJwt: any = jwt.verify(token, this.secretOrKey, this.verifyhOpts);
                    // console.log('jwt.verify:', token, 'OK');
                    // console.log('verifiedJwt:', verifiedJwt, 'OK');
                    // if (this.tokenExpired(verifiedJwt)) {
                    //     return res
                    //         .status(401)
                    //         .json({message: 'Unauthorized'});
                    // }

                    const user = await this.authController.findById(verifiedJwt.id);
                    if (user) {
                        return res
                            .json({user, token});
                    } else {
                        return res
                            .status(401)
                            .send(this.MESSAGES.notFound);
                    }

                } catch (e) {
                    console.log('jwt.verify:', e);
                    return res
                        .status(401)
                        .json(this.MESSAGES.unauthorized);
                }
            }

            passport.authenticate('local', {session: false}, (err, user, info) => {
                // console.log('authenticate', err, user, info);
                let token = '';

                if (err === this.STATUS.forbidden) {
                    return res
                        .status(403)
                        .json(this.MESSAGES.forbidden);
                }
                if (err === this.STATUS.unauthorized) {
                    return res
                        .status(401)
                        .json(this.MESSAGES.unauthorized);
                }
                if (err || !user) {
                    return res
                        .status(400)
                        .json(this.MESSAGES.othersError);
                }
                req.login(user, {session: false}, (error) => {
                    if (error) {
                        res.send(error);
                    }
                    // generate a signed son web token with the contents of user object and return it in the response
                    token = jwt.sign({id: user.id}, this.secretOrKey, this.signOpts);
                    return res.json({user, token});
                });
            })(req, res);
        });
        return this;
    }

    public initLocalStrategy() {
        passport.use(new LocalStrategy(this.localStrategyOpts, async (username, password, done) => {
                let authCtrlInfo: any;
                let error = null;
                let user = false;
                let info = null;
                const unAuthUser = '-';
                if (!username || username === unAuthUser) {
                    error = 'Unauthorized';
                    info = {message: 'Unauthorized'};
                } else {
                    try {
                        authCtrlInfo = await this.authController.login(username, password);

                        if (authCtrlInfo.user) {
                            user = authCtrlInfo.user;
                        } else {
                            error = authCtrlInfo.status;
                            info = {message: authCtrlInfo.message};
                        }
                    } catch (err) {
                        error = err;
                        info = {message: err};
                    }
                }
                return done(error, user, info);
            },
        ));
        return this;
    }

    public initJWTStrategy() {
        passport.use(new JWTStrategy(this.jwtStrategyOpts, (jwtPayload, done) => {

                if (this.tokenExpired(jwtPayload)) {
                    return done('Token expired');
                } else {
                    return this.authController.findById(jwtPayload.id)
                        .then((user: any) => {
                            // console.log('JWTStrategy', null, user);
                            return done(null, user);
                        })
                        .catch((err: any) => {
                            console.log('JWTStrategy', err);
                            return done(err);
                        });
                }
                //
                // try {
                //     const verifiedJwt: any = jwt.verify(token, this.secretOrKey, this.verifyhOpts);
                // } catch (e) {
                //     return done('Token expired or invalid');
                // }

                // console.log('JWTStrategy', jwtPayload);

                // return this.authController.findById(jwtPayload.id)
                //         .then((user: any) => {
                //             // console.log('JWTStrategy', null, user);
                //             return done(null, user);
                //         })
                //         .catch((err: any) => {
                //             console.log('JWTStrategy', err);
                //             return done(err);
                //         });
            },
        ));
        return this;
    }

    private tokenExpired(jwtPayload: any) {
        const now = new Date();

        return (jwtPayload.exp * 1000 < now.getTime());
    }
}
