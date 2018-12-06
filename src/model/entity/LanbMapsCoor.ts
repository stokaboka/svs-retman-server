/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import {Column, Entity, PrimaryColumn} from 'typeorm';

// `id`, `billing_id`, `device_id`, `coor`, `state`

@Entity()
export default class LanbMapsCoor {

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
        name: 'coors',
        type: 'varchar',
        length: 255,
    })
    public coors: string;

    @Column({
        name: 'state',
        type: 'int',
    })
    public state: number;
}
