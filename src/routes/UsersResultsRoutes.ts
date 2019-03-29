/*
 * Copyright (c) 2018. Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import UsersResultsController from '../model/controller/UsersResultsController';

const routes: any[] = [
    {
        method: 'get',
        route: '/user/results',
        controller: UsersResultsController,
        results: 'results',
    },
    {
        method: 'post',
        route: '/user/results',
        controller: UsersResultsController,
        action: 'save',
    },
];

export default routes;
