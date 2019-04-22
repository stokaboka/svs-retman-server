/*
 * Copyright (c) 2018. Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import GroupsController from '../model/controller/GroupsController';

const routes: any[] = [
    {
        method: 'get',
        route: '/g',
        controller: GroupsController,
        action: 'all',
        secure: true,
    },
];

export default routes;
