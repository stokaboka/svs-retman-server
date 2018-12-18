/*
 * Copyright (c) 2018. Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import dictionaryRoutes from './Dictionary';
import groupsRoutes from './Group';
import usersRoutes from './Users';
import usersGroupsRoutes from './UsersGroups';

export default [].concat(
    usersRoutes,
    dictionaryRoutes,
    groupsRoutes,
    usersGroupsRoutes,
);
