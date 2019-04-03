import dictionaryRoutes from './DictionaryRoutes';
import groupsRoutes from './GroupRoutes';
import usersGroupsRoutes from './UsersGroupsRoutes';
import usersRoutes from './UsersRoutes';

import lessonStagesRoutes from './LessonStagesRoutes';
import phasesRoutes from './PhasesRoutes';
import stepsRoutes from './StepsRoutes';

import cueRoutes from './CueRoutes';

import {NextFunction, Request, Response} from 'express';
import routes from './index';
import usersResultsRoutes from './UsersResultsRoutes';

export default class Router  {

    private routes: any[] = [];
    private app: any;

    constructor(app: any) {
        this.app = app;
        this.routes.concat(
            usersRoutes,
            groupsRoutes,
            usersGroupsRoutes,
            dictionaryRoutes,
            lessonStagesRoutes,
            phasesRoutes,
            stepsRoutes,
            cueRoutes,
            usersResultsRoutes,
        );
    }

    public initialise() {
        routes.forEach((route: any) => {
            (this.app as any)[route.method](route.route, (req: Request, res: Response, next: NextFunction) => {
                const result = (new (route.controller as any)())[route.action](req, res, next);
                if (result instanceof Promise) {
                    result.then((rslt) => rslt !== null && rslt !== undefined ? res.send(rslt) : undefined);

                } else if (result !== null && result !== undefined) {
                    res.json(result);
                }
            });
        });

    }
}
