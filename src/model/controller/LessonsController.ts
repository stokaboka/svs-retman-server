/*
 * Copyright (c) 2018. Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import {NextFunction, Request, Response} from 'express';
import {getRepository} from 'typeorm';
import Phases from '../entity/Phases';
import DBController from './DBController';

export default class LessonsController extends DBController {

    constructor() {
        super(getRepository(Phases));
    }

}
