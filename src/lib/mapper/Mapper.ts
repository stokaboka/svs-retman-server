/*
 * Copyright (c) 2018. Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import path from 'path';
import MappingAreaServer from './MappingAreaServer';
import TilesLoader from './TilesLoader';

export default class Mapper {

    private mappingArea = new MappingAreaServer(6);

    private config: any = {};

    constructor(geoPoint: any, zoom: number, imagesPath: string) {
        this.config = {
            logging: {
                level: 2,
            },
            images: {
                path: path.join(__dirname, imagesPath),
                reload: true,
            },
            /**
             * TODO move zoom into "grid"
             */
            map: {
                z: 12,
            },
            grid: this.mappingArea
                .setZoom(zoom)
                .setGeoPoint(geoPoint)
                .getGrid(),
        };
    }

    public start(forceReload: any) {
        this.config.images.reload = forceReload;
        const tilesLoader = new TilesLoader(this.config);
        tilesLoader.start();
    }
}
