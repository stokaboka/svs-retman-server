/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import MappingAreaServer from './MappingAreaServer';

/**
 * store and management data model
 */
export default class DataProvider {

    private geoPoint: any = null;
    private  zoom = 0;

    private layersData: any = {};

    private layers: any[] = [
        { id: '1', type: 'communication', label: 'Fiber', color: 'gray', icon: 'lens', points: 12, objects: 1 },
        { id: '2', type: 'communication', label: 'Cooper', color: 'green', icon: 'lens', points: 7, objects: 50 },
        { id: '3', type: 'communication', label: 'Air', color: 'blue', icon: 'lens' , points: 2, objects: 357},
        { id: '4', type: 'equipment', label: 'WIFI access point', color: 'darkblue',
            icon: 'lens', points: 1, objects: 333 },
        { id: '5', type: 'equipment', label: 'Switch', color: 'orangered', icon: 'lens', points: 1, objects: 589 },
        { id: '6', type: 'equipment', label: 'Hub', color: 'brown', icon: 'lens', points: 1, objects: 1328 },
    ];

    private types: any[] = [
        'equipment',
        'communication',
    ];

    private pArea: any = { lon: 0, lat: 0 };

    private pSize = { lon: 0, lat: 0 };

    // private area: any = {
    //     leftTop: { lon: 39.817329, lat: 57.317940 },
    //     rightBottom: { lon: 39.885135, lat: 57.290485 },
    // };

    private mappingArea: any = null;
    private grid: any = null;

    constructor() {
        this.area = {
                leftTop: { lon: 39.817329, lat: 57.317940 },
                rightBottom: { lon: 39.885135, lat: 57.290485 },
            };

        this.mappingArea = new MappingAreaServer(6);
    }

    /**
     * init grid info:
     * - top-left tile index
     * - num tiles
     * - zoom
     * initialisation tiles calculator
     * @param geoPoint
     * @param zoom
     */
    public initGrid(geoPoint: any, zoom: number) {
        this.geoPoint = geoPoint;
        this.zoom = zoom;
        this.grid = this.mappingArea
            .setZoom(this.zoom)
            .setGeoPoint(this.geoPoint)
            .getGrid();
    }

    /**
     * area getter/setter
     * left-top right-bottom coorditae of test geo area
     * @returns {{lon: number, lat: number}|*}
     */
    public get area() {
        return this.pArea;
    }

    public set area(value) {
        this.pArea = value;
        this.pSize = {
            lon: this.pArea.rightBottom.lon - this.pArea.leftTop.lon,
            lat: this.pArea.rightBottom.lat - this.pArea.leftTop.lat,
        };
    }

    public get size() {
        return this.pSize;
    }

    /**
     * create randow geo point inside test area
     * @returns {{geo: {lon: number, lat: number}}}
     */
    public getRandomPoint() {
        // geo = {
        //   lon: 39.849086,
        //   lat: 57.303309
        // }
        // geo = {
        //   lon: 39.877582,
        //   lat: 57.308744
        // }

        const geo = {
                lon: this.area.leftTop.lon + Math.random() * this.size.lon,
                lat: this.area.leftTop.lat + Math.random() * this.size.lat,
            };

        return {
            geo,
            // pixels:  this.mappingArea.geoPointToRelativePixelsPoint(geo)
        };
    }

    /**
     * create random polyline
     * @param n - num segments
     * @returns {any[]}
     */
    public getRandomPolyline(n: number) {
        // const n = Math.round(Math.random() * 7, 0) + 3
        const out = new Array(n);
        for (let i = 0; i < n; i++) {
            out[i] = this.getRandomPoint();
        }
        return out;
    }

    /**
     * get random type of object
     * @param n - max value of type
     * @returns {number}
     */
    public getRandomTypeObject(n: number) {
        const t = Math.round(Math.random() * n);
        return t === 0 ? 1 : t;
    }

    /**
     * generate array of points for type
     * @returns {*}
     * @param layer
     */
    public generatePointsByType(layer: any) {
        switch (layer.type) {
            case 'equipment' : // point
                return this.getRandomPoint();
            case 'communication' : // polyline
                return this.getRandomPolyline(layer.points);
            default:
                return this.getRandomPoint();
        }
    }

    /**
     * create object
     * @param id
     * @returns {{id: *, type: number, points: *}}
     */
    public createObject(layer: any, objectNum: any) {
        // const typeIndex = this.getRandomTypeObject(this.types.length)
        const out = {
            id: `${layer.id}-${objectNum}`,
            type: layer.type,
            label: `${layer.label}-${objectNum}`,
            color: layer.color,
            icon: layer.icon,
            points: this.generatePointsByType(layer),
        };

        return out;
    }

    /**
     * generate objects collection for layer ID
     * @param layer - layer ID
     * @returns {any[]}
     */
    public generateObjects(layer: any) {
        const objects = new Array(layer.objects);

        for (let o = 0; o < layer.objects; o++) {
            objects[o] = this.createObject(layer, o);
        }

        return objects;
    }

    /**
     * generate test data for layers
     * @returns {DataProvider}
     */
    public generateLayersData() {
        this.layersData = {};

        for (const layer of this.layers) {
            this.layersData[layer.id] = this.generateObjects(layer);
        }

        // for(let l = 0; l < this.layers.length; l++) {
        //     const layer = this.layers[l];
        //     this.layersData[layer.id] = this.generateObjects(layer);
        // }
        return this;
    }

    public getLayers() {
        return this.layers;
    }

    /**
     * get layer data by layer ID
     * @param layerId - layer ID
     * @returns {*}
     */
    public getLayerData(layerId: string) {
        if (this.layersData[layerId]) {
            return this.recalcObjects(this.layersData[layerId]);
        } else {
            return [];
        }
    }

    /**
     * recalc point pixels coordinate in new grid
     * by zoom
     * @param point
     * @returns {*}
     */
    public recalcPoint(point: any) {
        return Object.assign(
            {},
            point,
            {
                pixels: this.mappingArea.geoPointToRelativePixelsPoint(point.geo),
            },
        );
    }

    /**
     * recalc polyline pixels coordinate in new grid
     * @param points
     * @returns {Array}
     */
    public recalcPolyline(points: any[]) {
        return points.map((point) => {
            return this.recalcPoint(point);
        });
    }

    /**
     * recalc object in new grid
     * @param object
     * @returns {*}
     */
    public recalcObject(object: any) {
        switch (object.type) {
            case 'equipment' :
            case 1 : // point 1
            case 2 : // point 2
            case 3 : // point 3
                object.points = this.recalcPoint(object.points);
                break;
            case 'communication' :
            case 4 : // polyline 1
            case 5 : // polyline 2
            case 6 : // polyline 3
                object.points = this.recalcPolyline(object.points);
                break;
        }

        return object;
    }

    /**
     * recalc objects collection in new grid
     * @param object
     * @returns {*}
     */
    public recalcObjects(objects: any[]) {
        return objects.map((object) => {
            return this.recalcObject(object);
        });
    }

    /**
     * get object info from store
     * @param layerId
     * @param objectId
     * @returns {*}
     */
    public getObjectInfo(layerId: string, objectId: string) {
        if (this.layersData[layerId]) {
            const objects = this.layersData[layerId];
            const object = objects.find((element: any) => {
                return element.id === objectId;
            });

            if (object) {
                return object;
            }
        }

        return null;
    }
}
