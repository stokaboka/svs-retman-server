
/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import dotenv from 'dotenv';
import {NextFunction, Request, Response} from 'express';
import Mapper from '../../lib/mapper/Mapper';

export default class MapperController {

    private static ok() {
        return {
            message: '',
            result: 'ok',
        };
    }

    private static error(request: Request) {
        console.log('wrong Mapper parameters ', request.params);
        return {
            message: 'wrong mapper parameters',
            result: 'error',
        };
    }

    private tilesImagesPath: string;

    constructor() {
        dotenv.config();
        this.tilesImagesPath = process.env.TILES_IMAGES_PATH ? process.env.TILES_IMAGES_PATH : '../../../public/images';
    }

    public info(request: Request, response: Response, next: NextFunction) {
        return {
            message: 'wrong mapper parameters, expected format: mapper/lon/:lon/lat/:lat/zoom/:zoom',
            result: 'error',
        };
    }

    public start(request: Request, response: Response, next: NextFunction) {
        if (request.params.lon && request.params.lat && request.params.zoom) {
            return this.startMapper(request.params.lon, request.params.lat, request.params.zoom, false);
        } else {
            return MapperController.error(request);
        }
    }

    public reload(request: Request, response: Response, next: NextFunction) {
        if (request.params.lon && request.params.lat && request.params.zoom && request.params.reload) {
            const reloadExistTiles = (request.params.reload ? request.params.reload : '0') === '1';
            return this.startMapper(request.params.lon, request.params.lat, request.params.zoom, reloadExistTiles);
        } else {
            return MapperController.error(request);
        }
    }

    private startMapper(lat: string, lon: string, zoom: string, reload: boolean) {
        const mapper = new Mapper(
            {
                lat: parseFloat(lat),
                lon: parseFloat(lon),
            },
            parseInt(zoom, 10),
            this.tilesImagesPath,
        );

        mapper.start(reload);
        return MapperController.ok();
    }
}
