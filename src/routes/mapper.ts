
/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import dotenv from 'dotenv';
import express from 'express';
import Mapper from '../lib/mapper/Mapper';

dotenv.config();
const router = express.Router();

const tilesImagesPath = process.env.TILES_IMAGES_PATH ? process.env.TILES_IMAGES_PATH : '../../public/images';

function goMapper(req: any, res: any) {
  if (req.params.lon && req.params.lat && req.params.zoom) {
    const reloadExistTiles = (req.params.reload ? req.params.reload : '0') === '1';

    const mapper = new Mapper(
      {
          lat: parseFloat(req.params.lat),
          lon: parseFloat(req.params.lon),
      },
      parseInt(req.params.zoom, 10),
      tilesImagesPath,
    );

    mapper.start(reloadExistTiles);
    return {
        message: '',
        result: 'ok',
    };
  } else {
    console.log('wrong Mapper parameters ', req.params);
    return {
        message: 'wrong mapper parameters',
        result: 'error',
    };
  }
}

router.get('/',
    (req, res) => {
  res.send('parameters format: mapper/lon/:lon/lat/:lat/zoom/:zoom');
});

router.get('/lon/:lon/lat/:lat/zoom/:zoom',
    (req, res) => {
  const result = goMapper(req, res);
  res.header('Content-Type', 'application/json');
  res.send(result);
});

router.get('/lon/:lon/lat/:lat/zoom/:zoom/reload/:reload',
    (req, res) => {
  const result = goMapper(req, res);
  res.header('Content-Type', 'application/json');
  res.send(result);
});

export default router;
