/*
 * Copyright (c) 2018. Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import UsersGroupsController from '../model/controller/UsersGroupsController';

const routes: any[] = [
    {
        method: 'get',
        route: '/ug',
        controller: UsersGroupsController,
        action: 'all',
        secure: true,
    },
];

export default routes;
