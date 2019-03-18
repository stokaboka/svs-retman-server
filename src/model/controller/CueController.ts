/*
 * Copyright (c) 2018. Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import {getRepository} from 'typeorm';
import Cue from '../entity/Cue';
import DBController from './DBController';

export default class CueController extends DBController {

    constructor() {
        super(getRepository(Cue));
        super.order = {
            file: 'ASC',
            pos: 'ASC',
        };
    }
}
