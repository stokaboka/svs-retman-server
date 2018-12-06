/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import {getRepository} from 'typeorm';
import MapDevices from '../entity/MapDevices';
import DBController from './DBController';

export default class MapDevicesController extends DBController {

    constructor() {
        super(getRepository(MapDevices));
    }

}
