/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import {getRepository} from 'typeorm';
import UsersGroups from '../entity/UsersGroups';
import DBController from './DBController';

export default class UsersGroupsController extends DBController {

    constructor() {
        super(getRepository(UsersGroups));
    }

}
