/*
 * Copyright (c) 2018. Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import PhasesController from '../model/controller/PhasesController';

const routes: any[] = [
    {
        method: 'get',
        route: '/ph',
        controller: PhasesController,
        action: 'all',
    },
    {
        method: 'get',
        route: '/ph/step/:stepId',
        controller: PhasesController,
        action: 'find',
    },
];

export default routes;
