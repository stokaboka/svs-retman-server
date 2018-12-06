/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import express from 'express';
const router = express.Router();

import DataProvider from '../lib/mapper/DataProvider';

const ERRORS_MESSAGES = {
  WRONG_PARAMETERS: 'wrong DataProvider parameters, missing: lon, lat, zoom, layer',
};

const dataProvider = new DataProvider();
dataProvider.generateLayersData();

function getNetworkData(req: any, res: any) {
  if (req.params.lon && req.params.lat && req.params.zoom && req.params.layer) {
    const geoPoint = {
      lon: parseFloat(req.params.lon),
      lat: parseFloat(req.params.lat),
    };

    const zoom = parseInt(req.params.zoom, 10);

    dataProvider.initGrid(geoPoint, zoom);

/**
 * TODO change name variables - layers
 */
    const objects = dataProvider.getLayerData(req.params.layer);
    return {
      objects,
      result: 'OK',
      message: '',
    };
  } else {
    console.log('wrong DataProvider parameters ', req.params);
    return {
      result: 'error',
      message: ERRORS_MESSAGES.WRONG_PARAMETERS,
    };
  }
}

router.get('/', (req, res) => {
  const result = {
    result: 'error',
    message: ERRORS_MESSAGES.WRONG_PARAMETERS,
  };
  res.header('Content-Type', 'application/json');
  res.send(result);
});

// router.get('/lon/:lon/lat/:lat/zoom/:zoom', function(req, res) {
//     const result = getNetworkData(req, res);
//     res.header("Content-Type", "application/json");
//     res.send(result);
// });

router.get('/lon/:lon/lat/:lat/zoom/:zoom/layer/:layer', (req, res) => {
  const result = getNetworkData(req, res);
  res.header('Content-Type', 'application/json');
  res.send(result);
});

router.get('/layers',  (req, res) => {
  const result = dataProvider.getLayers();
  res.header('Content-Type', 'application/json');
  res.send(result);
});

router.get('/layer/:layer/object/:object', (req, res) => {
  const result = dataProvider.getObjectInfo(req.params.layer, req.params.object);
  res.header('Content-Type', 'application/json');
  res.send(result);
});

export default router;
