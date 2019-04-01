/*
 * Copyright (c) 2018. Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import UsersController from '../model/controller/UsersController';

const routes: any[] = [
    {
        method: 'get',
        route: '/users',
        controller: UsersController,
        action: 'users',
    },
    {
        method: 'put',
        route: '/user/:id',
        controller: UsersController,
        action: 'update',
    },
    // TODO app.ts - passport auth
    // {
    //     method: 'post',
    //     route: '/login',
    //     controller: UsersController,
    //     action: 'login',
    // },
    {
        method: 'post',
        route: '/logout',
        controller: UsersController,
        action: 'logout',
    },
    {
        method: 'post',
        route: '/register',
        controller: UsersController,
        action: 'register',
    },

    {
        method: 'delete',
        route: '/user/:id',
        controller: UsersController,
        action: 'delete',
    },

    {
        method: 'delete',
        route: '/user/login/:login',
        controller: UsersController,
        action: 'delete',
    },
];

export default routes;
