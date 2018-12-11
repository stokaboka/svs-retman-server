/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import {getRepository} from 'typeorm';
import Users from '../entity/Users';
import DBController from './DBController';

export default class UsersController extends DBController {

    constructor() {
        super(getRepository(Users));
    }

}
