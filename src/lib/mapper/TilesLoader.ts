/*
 * Copyright (c) 2018. Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

// const downloadImage = require('./dnl');
import axios from 'axios';
import fs from 'fs';
import path from 'path';

export default class TileLoader {

    public static getYandexTilesURL(vec: string) {
        return `https://${vec}.maps.yandex.net/tiles`;
    }

    private ready = false;
    private started = false;
    private completed = false;

    private logging = {
        level: 3,
    };

    private map = {
        l: 'map',
        lang: 'ru_RU',
        v: '18.10.20-0',
        scale: 1,
    };

    private images = {
        ext: 'png',
        reload: false,
        path: '',
    };

    private tiles: any[] = [];

    private grid = {
        begin: { x: 10005, y: 5008 },
        size: { x: 6, y: 6 },
        z: 14,
    };

    private urls = [ 'vec01', 'vec02', 'vec03', 'vec04', 'vec05', 'vec06', 'vec07' ];

    private current = {
        tile: {
            x: '',
            y: '',
        },
        url: '',
    };

    private index = {
        tile: -1,
        url: 0,
    };

    private loadedTiles = 0;

    constructor(cfg: any) {
        this.init(cfg);
    }

    public init(cfg: any) {
        this.started = false;
        this.completed = false;

        this.initConfig(cfg);
        this.initDirectory();
        this.initTilesCollection(this.grid);

        return this;
    }

    public initConfig(cfg: any) {
        if (cfg.map) {
            this.map = Object.assign({}, this.map, cfg.map);
        }

        if (cfg.images) {
            this.images = Object.assign({}, this.images, cfg.images);
        }

        if (cfg.grid) {
            this.grid = Object.assign({}, this.grid, cfg.grid);
        }

        if (cfg.logging) {
            this.logging = Object.assign({}, this.logging, cfg.logging);
        }
    }

    public initDirectory() {
        try {
            if (this.checkTilesPath()) {
                this.ready = true;
            } else {
                if (this.createTilesDirectory()) {
                    this.ready = true;
                }
            }
        } catch (e) {
            this.log(1, 'initDirectory error: ');
            this.log(1, e);
        }
    }

    public checkTilesPath() {
        const pt = this.getTilesPath();
        try {
            const stat = fs.statSync(pt);

            if (stat.isDirectory()) {
                return true;
            } else {
                throw new Error(`Path is not a directory: ${pt}`);
            }
        } catch (e) {
            this.log(0, e);
            return false;
        }
    }

    public checkTileImage(x: any, y: any) {
        const pt = this.getTileImagePath(x, y);
        try {
            const stat = fs.statSync(pt);

            return stat.isFile();
        } catch (e) {
            return false;
        }
    }

    public createTilesDirectory() {
        const pt = this.getTilesPath();
        try {
            fs.mkdirSync(pt);
            return true;
        } catch (e) {
            return false;
        }
    }

    public start() {
        if (this.ready) {
            if (this.started) {
                this.log(1, 'TilesLoader already started... Exited.');
            } else {
                this.log(1, '--- START');

                this.started = true;
                this.completed = false;
                this.loadedTiles = 0;

                this.resetTile();
                this.resetUrl();

                this.nextOrStop();
            }
        } else {
            this.log(1, 'Not ready... Exited.');
        }

        return this;
    }

    public stop() {
        this.log(1, '*** COMPLETE');
        this.log(1, `   LOADED TILES ${this.loadedTiles} from ${this.tiles.length}`);

        this.started = false;
        this.completed = true;

        if (this.logging.level > 0) {
            this.log(this.tiles);
        }
    }

    public successCallback() {
        this.log(2, '!!! SUCCEEDED', `tile:${this.index.tile} url:${this.index.url}`);

        this.fixTile();
        this.resetUrl();

        this.nextOrStop();
    }

    public failureCallback(error: any) {
        this.log(2, `??? FAILURE ${error}`, `tile:${this.index.tile} url:${this.index.url}`);

        if (this.nextUrl()) {
            this.next();
        } else {
            this.nextOrStop();
        }
    }

    public nextOrStop() {
        if (this.nextTile()) {
            this.next();
        } else {
            this.stop();
        }
    }

    public next() {
        this.log(3, '>>> NEXT', `tile:${this.index.tile} url:${this.index.url}`);
        this.log(2, '>>> NEXT TILE', this.getTileImageFileName(this.current.tile.x, this.current.tile.y));

        const turl = this.getCurrentURL();
        const tparams = this.getCurrentParams();
        const fpath = this.getCurrentTileImagePath();

        this.downloadImage(turl, tparams, fpath)
            .then(
                () => {
                    this.successCallback();
                })
            .catch(
            (error) => {
                this.failureCallback(error);
            });
    }

    public fixTile() {
        this.loadedTiles++;
        if (this.index.tile >= 0 && this.index.tile < this.tiles.length) {
            this.tiles[this.index.tile].vec = this.urls[this.index.url];
        }
    }

    public resetUrl() {
        this.index.url = 0;
        this.current.url = this.urls[this.index.url];
        this.log(3, '=== RESET URL ', `tile:${this.index.tile} url:${this.index.url}`);
    }

    public resetTile() {
        this.index.tile = -1;
        this.current.tile = this.tiles[this.index.tile];
        this.log(3, '=== RESET TILE ', `tile:${this.index.tile}`);
    }

    public nextUrl() {
        let out = true;

        if (++this.index.url >= this.urls.length) {
            this.log(3, '### Stop tryes URLS', `tile:${this.index.tile} url:${this.index.url}`);
            this.index.url = 0;
            out = false;
        }

        this.current.url = TileLoader.getYandexTilesURL(this.urls[this.index.url]);

        if (out) {
            this.log(3, '=== NEXT URL ', `tile:${this.index.tile} url:${this.index.url}`);
        }

        return out;
    }

    public nextTile() {
        let out = true;

        if (++this.index.tile >= this.tiles.length) {
            this.log(2, '### Stop tryes TILES', `tile:${this.index.tile} url:${this.index.url}`);
            out = false;
        } else {
            this.current.tile = this.tiles[this.index.tile];
        }

        if (out) {
            this.log(3, '=== NEXT TILE', `tile:${this.index.tile} url:${this.index.url}`);
        }

        return out;
    }

    public getCurrentParams() {
        return {
            l: this.map.l,
            v: this.map.v,
            x: this.current.tile.x,
            y: this.current.tile.y,
            z: this.grid.z,
            scale: this.map.scale,
            lang: this.map.lang,
        };
    }

    public getCurrentURL() {
        return this.current.url;
    }

    public getTilesPath() {
        return path.resolve(this.images.path, `${this.grid.z}`);
    }

    public getTileImageFileName(x: any, y: any) {
        return `${x}-${y}.${this.images.ext}`;
    }

    public  getTileImagePath(x: any, y: any) {
        return path.resolve(this.getTilesPath(), this.getTileImageFileName(x, y));
    }

    public getCurrentTileImagePath() {
        return path.resolve(this.getTilesPath(),
            this.getTileImageFileName(this.current.tile.x, this.current.tile.y));
    }

    public log(l: number | any[], m: string = '', info: string = '') {
        if (this.logging.level >= l) {
            if (!info) {
                info = '';
            }
            console.log(`${m} # ${info}`);
        }
    }

    public initTilesCollection(grid: any) {
        this.tiles = [];

        for (let x = 0; x < grid.size.x; x++) {
            for (let y = 0; y < grid.size.y; y++) {
                const tileInfo = { x: grid.begin.x + x, y: grid.begin.y + y, vec: '' };
                if (this.checkTileImage(tileInfo.x, tileInfo.y)) {
                    // tile image exist
                    if (this.images.reload) {
                        this.tiles.push(tileInfo);
                    }
                } else {
                    this.tiles.push(tileInfo);
                }
            }
        }
    }

    public async downloadImage(url: any, params: any, file: string) {
        const response = await axios({
            method: 'GET',
            params,
            responseType: 'stream',
            url,
        });

        response.data.pipe(fs.createWriteStream(file));

        return new Promise((resolve, reject) => {
            response.data.on('end', (resp: any) => {
                resolve(resp);
            });

            response.data.on('error', (e: any) => {
                reject(e);
            });
        });
    }
}
