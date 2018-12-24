/*
 * Copyright (c) 2018. Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import dictionaryRoutes from './DictionaryRoutes';
import groupsRoutes from './GroupRoutes';
import usersGroupsRoutes from './UsersGroupsRoutes';
import usersRoutes from './UsersRoutes';

import LessonStagesRoutes from './LessonStagesRoutes';
import PhasesRoutes from './PhasesRoutes';
import StepsRoutes from './StepsRoutes';

export default [].concat(
    usersRoutes,
    groupsRoutes,
    usersGroupsRoutes,
    dictionaryRoutes,
    LessonStagesRoutes,
    PhasesRoutes,
    StepsRoutes,
);
