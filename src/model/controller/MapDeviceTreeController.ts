/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import {getRepository} from 'typeorm';
import MapDeviceTree from '../entity/MapDeviceTree';
import DBController from './DBController';

export default class MapDeviceTreeController extends DBController {

    constructor() {
        super(getRepository(MapDeviceTree));
    }

}
