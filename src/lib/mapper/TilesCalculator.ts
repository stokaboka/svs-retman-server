/*
 * Copyright (c) 2018. Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

/**
 * - общее число тайлов на масштабе 19 - 4^19 = 274 877 906 944
 * - число тайлов по вертикали / горизонтали 4^19 / 2 = 274 877 906 944 / 2 = 137 438 953 472
 * - число пикселей по вертикали / горизонтали 256 * 4^19 / 2 = 256 * 274 877 906 944 / 2 = 36 421 322 670 080
 * @type {Mercator}
 */

import DecartPoint from './DecartPoint';
import Mercator from './Mercator';

export default class TilesCalculator {

    // mercator algoritm
    private mercator = new Mercator();

    // Длина экватора
    private equatorLength = 40075016.685578488;
    //  половина экватора
    private equatorHalfLength = this.equatorLength / 2;

    // максимальный масштаб
    private pZoom = 0;

    // размер (ширина = высота) тайла
    private pTileSize: number = 256;

    // общее количество тайлов при максимальном масштабе
    private numTotalTilesByZoom = 0;
    private numTilesByZoom = 0;

    // Размер мира в пикселах ширина = высота =
    // this.worldSizeInPixels = Math.pow(2, 31)
    private worldSizeInPixels = 0;
    // this.__worldSizeInPixels__ = Math.pow( 2, ( this.zoom + 8 ) );

    // пикселей на метр
    private pixelsByMeter = 0;

    private pipeList: any[] = [];

    public get zoom() {
        return this.pZoom;
    }
    public set zoom(value) {
        this.pZoom = value;
        this.init();
    }

    public get tileSize() {
        return this.pTileSize;
    }

    public set tileSize(value: number) {
        this.pTileSize = value;
        this.init();
    }

    public testZoom() {
        if (this.zoom < 2 || this.zoom > 19) {
            throw new Error('TilesCalculator error: zoom not defined or out of range (2-19)');
        }
    }

    public init() {
        this.testZoom();

        // общее количество тайлов при заданном масштабе
        this.numTotalTilesByZoom = Math.pow(4, this.zoom);
        this.numTilesByZoom = Math.sqrt(this.numTotalTilesByZoom);

        // Размер мира в пикселах ширина = высота =
        // this.worldSizeInPixels = Math.pow(2, 31)
        this.worldSizeInPixels = this.tileSize * this.numTilesByZoom;
        // this.__worldSizeInPixels__ = Math.pow( 2, ( this.zoom + 8 ) );

        // пикселей на метр
        this.pixelsByMeter = this.worldSizeInPixels / this.equatorLength;

        return this;
    }

    public displayParams() {
        this.testZoom();

        console.log('--- TilesCalculator parameters ---');
        console.log(`  numTilesByZoom: ${this.numTotalTilesByZoom} / ${this.numTilesByZoom}`);
        console.log(`worldSizeInPixels: ${this.worldSizeInPixels}`);
        console.log(`    pixelsByMeter: ${this.pixelsByMeter}`);
        console.log('==================================');
        console.log();
        return this;
    }

    public geoToMeter(geoPoint: any) {
        this.testZoom();
        return this.mercator.point2m(geoPoint);
    }

    public geoToPixels(geoPoint: any) {
        this.testZoom();
        const point = this.geoToMeter(geoPoint);
        return this.meterToPixels(point);
    }

    public meterToGeo(meterPoint: any) {
        this.testZoom();
        return this.mercator.point2ll(meterPoint);
    }

    public meterToPixels(meterPoint: any) {
        this.testZoom();
        const x = Math.round((this.equatorHalfLength + meterPoint.x) * this.pixelsByMeter);
        const y = Math.round((this.equatorHalfLength - meterPoint.y) * this.pixelsByMeter);

        return new DecartPoint(x, y);
    }

    public pixelsToMeter(pixelPoint: any) {
        this.testZoom();
        const x = pixelPoint.x / this.pixelsByMeter - this.equatorHalfLength;
        const y = this.equatorHalfLength - pixelPoint.y / this.pixelsByMeter;

        return new DecartPoint(x, y);
    }

    public pixelsToGeo(pixelPoint: any) {
        this.testZoom();
        const point = this.pixelsToMeter(pixelPoint);
        return this.meterToGeo(point);
    }

    public pixelToTile(pixelPoint: any) {
        this.testZoom();
        return new DecartPoint(
            Math.floor(pixelPoint.x / this.tileSize),
            Math.floor(pixelPoint.y / this.tileSize),
        );
    }

    public tileToPixels(tile: any) {
        this.testZoom();
        return new DecartPoint(
            tile.x * this.tileSize,
            tile.y * this.tileSize,
        );
    }
}
