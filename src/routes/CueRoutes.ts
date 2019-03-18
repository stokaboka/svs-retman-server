/*
 * Copyright (c) 2018. Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import CueController from '../model/controller/CueController';

const routes: any[] = [
    {
        method: 'get',
        route: '/cue',
        controller: CueController,
        action: 'all',
    },
    {
        method: 'get',
        route: '/cue/file/:file',
        controller: CueController,
        action: 'find',
    },
];

export default routes;
