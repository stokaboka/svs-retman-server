/*
 * Copyright (c) 2018. Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import UsersResultsController from '../model/controller/UsersResultsController';

const routes: any[] = [
    {
        method: 'get',
        route: '/user/results/:user',
        controller: UsersResultsController,
        action: 'results',
        secure: true,
    },

    {
        method: 'get',
        route: '/user/result/:user',
        controller: UsersResultsController,
        action: 'result',
        secure: true,
    },
    {
        method: 'post',
        route: '/user/result',
        controller: UsersResultsController,
        action: 'calc',
        secure: true,
    },
];

export default routes;
