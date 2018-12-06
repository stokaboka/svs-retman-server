/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import {getRepository} from 'typeorm';
import DeviceGroups from '../entity/DeviceGroups';
import DBController from './DBController';

export default class DeviceGroupsController extends DBController {

    constructor() {
        super(getRepository(DeviceGroups));
    }

}
