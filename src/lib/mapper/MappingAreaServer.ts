/*
 * Copyright (c) 2018. Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import Mapping from './Mapping';

export default class MappingAreaServer extends Mapping {
    constructor(pAreaSize: number) {
        super();
        this.areaSizeWidth = pAreaSize;
        this.areaSizeHeight = pAreaSize;

        this.halfAreaSizeWidth = Math.ceil(this.areaSizeWidth / 2);
        this.halfAreaSizeHeight = Math.ceil(this.areaSizeHeight / 2);
    }
}
