/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import {Column, Entity, PrimaryColumn} from 'typeorm';

// `id`, `billingid`, `device_id`, `name`, `ip`, `uptime`, `address`, `public`, `group_id`

@Entity()
export default class MapDevices {

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
        name: 'name',
        type: 'varchar',
        length: 100,
    })
    public name: string;

    @Column({
        name: 'ip',
        type: 'varchar',
        length: 100,
    })
    public ip: string;

    @Column({
        name: 'uptime',
        type: 'bigint',
    })
    public upTime: number;

    @Column({
        name: 'address',
        type: 'varchar',
        length: 255,
    })
    public address: string;

    @Column({
        name: 'public',
        type: 'varchar',
        length: 255,
    })
    public public: string;

    @Column({
        name: 'group_id',
        type: 'int',
    })
    public groupId: number;

}
