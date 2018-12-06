import DeviceGroupsController from '../model/controller/DeviceGroupsController';
import LanbMapsCoorController from '../model/controller/LanbMapsCoorController';
import LbCfgController from '../model/controller/LbCfgController';
import MapDevicesController from '../model/controller/MapDevicesController';
import MapDeviceTreeController from '../model/controller/MapDeviceTreeController';

import MapperController from '../model/controller/MapperController';

const routes: any[] = [
    {
        method: 'get',
        route: '/dg',
        controller: DeviceGroupsController,
        action: 'all',
    },
    {
        method: 'get',
        route: '/lmc',
        controller: LanbMapsCoorController,
        action: 'all',
    },
    {
        method: 'get',
        route: '/lc',
        controller: LbCfgController,
        action: 'all',
    },
    {
        method: 'get',
        route: '/md',
        controller: MapDevicesController,
        action: 'all',
    },
    {
        method: 'get',
        route: '/mdt',
        controller: MapDeviceTreeController,
        action: 'all',
    },

    {
        method: 'get',
        route: '/mapper/',
        controller: MapperController,
        action: 'info',
    },

    {
        method: 'get',
        route: '/mapper/lon/:lon/lat/:lat/zoom/:zoom',
        controller: MapperController,
        action: 'start',
    },

    {
        method: 'get',
        route: '/mapper/lon/:lon/lat/:lat/zoom/:zoom/reload/:reload',
        controller: MapperController,
        action: 'reload',
    },
//     {
//     method: 'post',
//     route: '/users',
//     controller: UserController,
//     action: 'save'
// }, {
//     method: 'delete',
//     route: '/users',
//     controller: UserController,
//     action: 'remove'
// }, {
//     method: 'get',
//     route: '/photos',
//     controller: PhotoController,
//     action: 'all'
// }
];

export default routes;
