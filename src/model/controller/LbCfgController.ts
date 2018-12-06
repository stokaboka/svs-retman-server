/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import {getRepository} from 'typeorm';
import LbCfg from '../entity/LbCfg';
import DBController from './DBController';

export default class LbCfgController extends DBController {

    constructor() {
        super(getRepository(LbCfg));
    }

}
