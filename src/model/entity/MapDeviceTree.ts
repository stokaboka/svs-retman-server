/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import {Column, Entity, PrimaryColumn} from 'typeorm';

// `id`, `billingid`, `device_id`, `parent_device_id`

@Entity()
export default class MapDeviceTree {

    @PrimaryColumn()
    public id: number;

    @Column({
        name: 'billing_id',
        type: 'int',
    })
    public billingId: number;

    @Column({
        name: 'device_id',
        type: 'int',
    })
    public deviceId: number;

    @Column({
        name: 'parent_device_id',
        type: 'int',
    })
    public parentDeviceId: number;

}
