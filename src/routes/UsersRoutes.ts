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
        secure: true,
    },
    {
        method: 'get',
        route: '/userss',
        controller: UsersController,
        action: 'search',
        secure: true,
    },
    {
        method: 'put',
        route: '/user/:id',
        controller: UsersController,
        action: 'update',
        secure: true,
    },
    // TODO app.ts - passport auth
    // {
    //     method: 'post',
    //     route: '/login',
    //     controller: UsersController,
    //     action: 'login',
    //     secure: true,
    // },
    {
        method: 'post',
        route: '/logout',
        controller: UsersController,
        action: 'logout',
        secure: true,
    },
    // {
    //     method: 'post',
    //     route: '/register',
    //     controller: UsersController,
    //     action: 'register',
    //     secure: false,
    // },

    {
        method: 'delete',
        route: '/user/:id',
        controller: UsersController,
        action: 'delete',
        secure: true,
    },

    {
        method: 'delete',
        route: '/user/login/:login',
        controller: UsersController,
        action: 'delete',
        secure: true,
    },
];

export default routes;
