/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import {Column, Entity, PrimaryColumn} from 'typeorm';

// `id`, `billingid`, `group_id`, `name`, `desc`, `coors`

@Entity('device_groups')
export default class DeviceGroups {

    @PrimaryColumn()
    public id: number;

    @Column({
        name: 'billing_id',
        type: 'int',
    })
    public billingId: number;

    @Column({
        name: 'group_id',
        type: 'int',
    })
    public groupId: number;

    @Column({
        name: 'name',
        type: 'varchar',
        length: 255,
    })
    public name: string;

    @Column({
        name: 'desc',
        type: 'varchar',
        length: 255,
    })
    public desc: string;

    @Column({
        name: 'coors',
        type: 'varchar',
        length: 255,
    })
    public coors: string;

    @Column({
        name: 'point',
        type: 'varchar',
        length: 255,
    })
    public point: string;
}
