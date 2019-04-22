/*
 * Copyright (c) 2018. Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import DictionaryController from '../model/controller/DictionaryController';

const routes: any[] = [
    {
        method: 'get',
        route: '/words',
        controller: DictionaryController,
        action: 'alll',
        secure: false,
    },

    {
        method: 'get',
        route: '/words/scope/:scope',
        controller: DictionaryController,
        action: 'words',
        secure: false,
    },

    {
        method: 'get',
        route: '/words/scope/:scope/lang1/:lang1',
        controller: DictionaryController,
        action: 'words',
        secure: false,
    },

    {
        method: 'get',
        route: '/words/scope/:scope/lang2/:lang2',
        controller: DictionaryController,
        action: 'words',
        secure: false,
    },

    {
        method: 'get',
        route: '/words/scope/:scope/lang1/:lang1/lang2/:lang2',
        controller: DictionaryController,
        action: 'words',
        secure: false,
    },

    {
        method: 'put',
        route: '/words',
        controller: DictionaryController,
        action: 'update',
        secure: true,
    },
];

export default routes;
