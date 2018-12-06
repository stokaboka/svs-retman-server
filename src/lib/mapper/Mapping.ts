/*
 * Copyright (c) 2018. Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import Piper from '../Piper';
import TilesCalculator from './TilesCalculator';

export default class Mapping {

    protected areaSizeWidth = 6;
    protected areaSizeHeight = 6;

    protected halfAreaSizeWidth = Math.ceil(this.areaSizeWidth / 2);
    protected halfAreaSizeHeight = Math.ceil(this.areaSizeHeight / 2);

    private geoPoint: any = null;

    private beginTile = { x: 0, y: 0 };
    private beginTilePixels = { x: 0, y: 0 };

    private tilesCalculator = new TilesCalculator();

    private point: any = null;
    private typePoint: any = null;

    private minZoom = 2;
    private maxZoom = 19;

    private piper = new Piper();

    public getZoom() {
        return this.tilesCalculator.zoom;
    }

    public setZoom(value: any) {
        this.tilesCalculator.zoom = value;
        return this;
    }

    public changeZoom(value: number) {
        if (this.minZoom < this.getZoom() && this.getZoom() < this.maxZoom) {
            this.setZoom(this.getZoom() + value);
        }
        return this;
    }

    public getMapControlsInfo() {
        return {
            zoom: this.getZoom(),
            incDisable: this.getZoom() >= this.maxZoom,
            decDisable: this.getZoom() <= this.minZoom,
        };
    }

    public setGeoPoint(point: any) {
        this.point = point;
        this.geoPoint = point;
        this.typePoint = 'GEO';
        return this;
    }

    public setMeterPoint(point: any) {
        this.point = point;
        this.typePoint = 'METER';
        return this;
    }

    public setPixelPoint(point: any) {
        this.point = point;
        this.typePoint = 'PIXEL';
        return this;
    }

    public setTilePoint(point: any) {
        this.point = point;
        this.typePoint = 'TILE';
        return this;
    }

    public geoPointToPixelsPoint(geoPoint: any) {
        return this.tilesCalculator.meterToPixels(this.tilesCalculator.geoToMeter(geoPoint));
    }

    public pixelsPointToRelativePixelsPoint(pixelsPoint: any) {
        return {
            x: pixelsPoint.x - this.beginTilePixels.x,
            y: pixelsPoint.y - this.beginTilePixels.y,
        };
    }

    public geoPointToRelativePixelsPoint(geoPoint: any) {
        const pixelsPoint = this.geoPointToPixelsPoint(geoPoint);
        return this.pixelsPointToRelativePixelsPoint(pixelsPoint);
    }

    public getGrid() {
        let tilePoint = null;
        let geoPoint = null;

        this.setGeoPoint(this.geoPoint);

        this.piper.context(this.tilesCalculator);

        switch (this.typePoint) {
            case 'GEO':

                geoPoint = this.point;

                tilePoint = this.piper
                    .clear()
                    .value(this.point)
                    .pipe([
                        this.tilesCalculator.geoToMeter,
                        this.tilesCalculator.meterToPixels,
                        this.tilesCalculator.pixelToTile,
                    ])
                    .calc()
                    .value();

                break;

            case 'METER':

                geoPoint = this.piper
                    .clear()
                    .value(this.point)
                    .pipe([
                        this.tilesCalculator.meterToGeo,
                    ])
                    .calc()
                    .value();

                tilePoint = this.piper
                    .clear()
                    .value(this.point)
                    .pipe([
                        this.tilesCalculator.meterToPixels,
                        this.tilesCalculator.pixelToTile,
                    ])
                    .calc()
                    .value();

                break;

            case 'PIXEL':

                geoPoint = this.piper
                    .clear()
                    .value(this.point)
                    .pipe([
                        this.tilesCalculator.pixelsToMeter,
                        this.tilesCalculator.meterToGeo,
                    ])
                    .calc()
                    .value();

                tilePoint = this.piper
                    .clear()
                    .value(this.point)
                    .pipe([
                        this.tilesCalculator.pixelToTile,
                    ])
                    .calc()
                    .value();

                break;

            case 'TILE':

                geoPoint = this.piper
                    .clear()
                    .value(this.point)
                    .pipe([
                        this.tilesCalculator.tileToPixels,
                        this.tilesCalculator.pixelsToMeter,
                        this.tilesCalculator.meterToGeo,
                    ])
                    .calc()
                    .value();

                tilePoint = this.point;

                break;

            default:
                return null;
        }

        /**
         * TODO dvaules is NAN !!! why?
         * @type {{x: number, y: number}}
         */
        // this.beginTile = {
        //   x: tilePoint.x - this.halfAreaSizeWidth,
        //   y: tilePoint.y - this.halfAreaSizeHeight
        // }

        this.beginTile = {
            x: tilePoint.x - 3,
            y: tilePoint.y - 3,
        };

        this.beginTilePixels = this.tilesCalculator.tileToPixels(this.beginTile);

        // this.doLoadTiles(geoPoint, 0)

        return {
            geoPoint,
            begin: this.beginTile,
            size: {
                x: this.areaSizeWidth,
                y: this.areaSizeHeight,
            },
            z: this.getZoom(),
        };
    }

    public onPan(position: any) {
        const piper = new Piper();

        this.geoPoint = piper
            .context(this.tilesCalculator)
            .value(this.geoPoint)
            .pipe([
                this.tilesCalculator.geoToMeter,
                this.tilesCalculator.meterToPixels,
            ])
            .calc()
            .minus(position.x, 'x')
            .minus(position.y, 'y')
            .pipe([
                this.tilesCalculator.pixelsToMeter,
                this.tilesCalculator.meterToGeo,
            ])
            .calc()
            .value();
    }
}
