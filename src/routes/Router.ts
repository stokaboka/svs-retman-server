// import passport from 'passport';

import dictionaryRoutes from './DictionaryRoutes';
import groupsRoutes from './GroupRoutes';
import usersGroupsRoutes from './UsersGroupsRoutes';
import usersRoutes from './UsersRoutes';

import lessonStagesRoutes from './LessonStagesRoutes';
import phasesRoutes from './PhasesRoutes';
import stepsRoutes from './StepsRoutes';

import cueRoutes from './CueRoutes';

import usersResultsRoutes from './UsersResultsRoutes';

import {NextFunction, Request, Response} from 'express';

import Auth from '../auth/Auth';

export default class Router {

    private routes: any[] = [];
    private app: any;

    private secureRoutes = ['/user/results', '/user/result'];
    private secureMethods = ['PUT', 'POST', 'DELETE'];

    constructor(app: any) {
        this.app = app;
        this.routes = []
            .concat(
            usersRoutes,
            groupsRoutes,
            usersGroupsRoutes,
            dictionaryRoutes,
            lessonStagesRoutes,
            phasesRoutes,
            stepsRoutes,
            cueRoutes,
            usersResultsRoutes);
        //     .map((r) => {
        //         const fndRoute = this.secureRoutes.findIndex((s) => r.route.startsWith(s));
        //         // const fndMethod = this.secureMethods.findIndex((s) => r.method.toUpperCase().startsWith(s));
        //         // const secure = fndRoute !== -1 || fndMethod !== -1;
        //         const secure = fndRoute !== -1;
        //         return {
        //             ...r,
        //             secure,
        //         };
        //     }, this);
        //

        // console.log('secure routes', this.routes.filter((r) => r.secure).map((r) => r.route));
    }

    public initialise(auth: Auth) {
        this.routes.forEach((route: any) => {

            if (route.secure) {
                (this.app as any)[route.method](route.route,
                    auth.passport.authenticate('jwt', {session: false}),
                    (req: Request, res: Response, next: NextFunction) => {
                        const result = (new (route.controller as any)())[route.action](req, res, next);
                        if (result instanceof Promise) {
                            result.then((rslt) => rslt !== null && rslt !== undefined ? res.send(rslt) : undefined);
                        } else if (result !== null && result !== undefined) {
                            res.json(result);
                        }
                    });

            } else {
                (this.app as any)[route.method](route.route,
                    (req: Request, res: Response, next: NextFunction) => {
                        const result = (new (route.controller as any)())[route.action](req, res, next);
                        if (result instanceof Promise) {
                            result.then((rslt) => rslt !== null && rslt !== undefined ? res.send(rslt) : undefined);
                        } else if (result !== null && result !== undefined) {
                            res.json(result);
                        }
                    });
            }

        });

    }
}
