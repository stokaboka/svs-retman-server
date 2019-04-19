// https://medium.com/front-end-weekly/learn-using-jwt-with-passport-authentication-9761539c4314

import jwt from 'jsonwebtoken';
import passport from 'passport';
import passportLocal from 'passport-local';
const LocalStrategy = passportLocal.Strategy;

import passportJWT from 'passport-jwt';
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

import {NextFunction, Request, Response} from 'express';
import AuthController from '../model/controller/AuthController';

export default class Auth {

    public passport = passport;

    private app: any;
    private authController: AuthController;
    private secret = 'svoboda_slova';

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

    public initialiseRoutes() {
        this.app.post('/login', async (req: Request, res: Response, next: NextFunction) => {

            if (req.headers && req.headers.authorization) {
                const token = req.headers.authorization.substr(7);
                try {
                    const verifiedJwt: any = jwt.verify(token, this.secret);
                    // console.log('jwt.verify:', token, 'OK');
                    // console.log('verifiedJwt:', verifiedJwt, 'OK');

                    if (this.tokenExpired(verifiedJwt)) {
                        return res
                            .status(401)
                            .json({message: 'Unauthorized'});
                    }

                    const user = await this.authController.findById(verifiedJwt.id);
                    if (user) {
                        return res.json({user, token});
                    } else {
                        res.send('User not found');
                    }

                } catch (e) {
                    // console.log('jwt.verify:', token, e);
                }
            }

            passport.authenticate('local', {session: false}, (err, user, info) => {
                // console.log('authenticate', err, user, info);

                if (err === 'Forbidden') {
                    return res
                        .status(403)
                        .json({ message: 'Forbidden'});
                }
                if (err === 'Unauthorized') {
                    return res
                        .status(401)
                        .json({ message: 'Unauthorized'});
                }
                if (err || !user) {
                    return res
                        .status(400)
                        .json({
                        message: 'Something is not right',
                        user,
                    });
                }
                req.login(user, {session: false}, (error) => {
                    if (error) {
                        res.send(error);
                    }
                    // generate a signed son web token with the contents of user object and return it in the response
                    const token = jwt.sign({id: user.id}, this.secret,  { expiresIn: '10h' });
                    return res.json({user, token});
                });
            })(req, res);
        });
    }

    // public initialiseRoutes() {
    //     this.app.post('/login',
    //         passport.authenticate('local'),
    //         (req: Request, res: Response, next: NextFunction) => {
    //             res.json(res.req.user);
    //             if (next) {
    //                 next();
    //             }
    //         },
    //     );
    // }

    public localStrategy() {
        passport.use(new LocalStrategy(
            {
                usernameField: 'login',
                passwordField: 'password',
            },
            async (username, password, done) => {

                if (!username || '-' === username) {
                    return done('Unauthorized', false, {message: 'Unauthorized'});
                }
                try {
                    const info = await this.authController.login(username, password);

                    if (info.user) {
                        return done(null, info.user);
                    } else {
                        return done(info.status, false, {message: info.message});
                    }
                } catch (err) {
                    return done(err, false, {message: err});
                }
            },
        ));
        return this;
    }

    public JWTStrategy() {
        passport.use(new JWTStrategy({
                jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
                secretOrKey   : this.secret,
            },
            (jwtPayload, cb) => {

            if (this.tokenExpired(jwtPayload)) {
                return cb('Token expired');
            }

            return this.authController.findById(jwtPayload.id)
                    .then((user: any) => {
                        return cb(null, user);
                    })
                    .catch((err: any) => {
                        return cb(err);
                    });
            },
        ));
        return this;
    }

    private tokenExpired(jwtPayload: any) {
        const now = new Date();

        return (jwtPayload.exp * 1000 < now.getTime());
    }
}
