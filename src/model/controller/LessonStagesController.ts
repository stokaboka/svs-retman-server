/*
 * Copyright (c) 2018. Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import {NextFunction, Request, Response} from 'express';
import {getRepository} from 'typeorm';
import LessonStages from '../entity/LessonStages';
import DBController from './DBController';

export default class LessonStagesController extends DBController {

    constructor() {
        super(getRepository(LessonStages));
        // super.setOrder(this.stagesOrder);
        super.order =  {
            lang: 'ASC',
            stepId: 'ASC',
            phaseNum: 'ASC',
            lesson: 'ASC',
            stage: 'ASC',
        };
    }

}
