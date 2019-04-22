/*
 * Copyright (c) 2018. Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import StepsController from '../model/controller/StepsController';

const routes: any[] = [
    {
        method: 'get',
        route: '/s',
        controller: StepsController,
        action: 'all',
        secure: false,
    },
];

export default routes;
