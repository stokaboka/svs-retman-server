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
        secure: false,
    },
    {
        method: 'get',
        route: '/ph/step/:step',
        controller: PhasesController,
        action: 'find',
        secure: false,
    },
];

export default routes;
