/*
 * Copyright (c) 2018. Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import LessonStagesController from '../model/controller/LessonStagesController';

const routes: any[] = [
    {
        method: 'get',
        route: '/ls',
        controller: LessonStagesController,
        action: 'all',
        secure: false,
    },
    {
        method: 'get',
        route: '/ls/lang/:lang',
        controller: LessonStagesController,
        action: 'find',
        secure: false,
    },
];

export default routes;
