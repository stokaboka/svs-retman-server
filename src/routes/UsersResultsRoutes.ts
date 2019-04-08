/*
 * Copyright (c) 2018. Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import UsersResultsController from '../model/controller/UsersResultsController';

const routes: any[] = [
    {
        method: 'get',
        route: '/user/results',
        controller: UsersResultsController,
        action: 'results',
    },

    {
        method: 'get',
        route: '/user/result',
        controller: UsersResultsController,
        action: 'result',
    },
    {
        method: 'post',
        route: '/user/result',
        controller: UsersResultsController,
        action: 'calc',
    },
];

export default routes;
