/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import {getRepository} from 'typeorm';
import Groups from '../entity/Groups';
import DBController from './DBController';

export default class GroupsController extends DBController {

    constructor() {
        super(getRepository(Groups));
    }

}
