/*
 * Copyright (c) 2018. Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import dictionaryRoutes from './DictionaryRoutes';
import groupsRoutes from './GroupRoutes';
import usersGroupsRoutes from './UsersGroupsRoutes';
import usersRoutes from './UsersRoutes';

import lessonStagesRoutes from './LessonStagesRoutes';
import phasesRoutes from './PhasesRoutes';
import stepsRoutes from './StepsRoutes';

import cueRoutes from './CueRoutes';

import usersResultsRoutes from './UsersResultsRoutes';

export default [].concat(
    usersRoutes,
    groupsRoutes,
    usersGroupsRoutes,
    dictionaryRoutes,
    lessonStagesRoutes,
    phasesRoutes,
    stepsRoutes,
    cueRoutes,
    usersResultsRoutes,
);
