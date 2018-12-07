/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('Groups')
export default class Groups {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({
        type: 'varchar',
        length: 255,
        unique: true,
    })
    public name: string;

    @Column({
        type: 'varchar',
        length: 255,
    })
    public role: string;

}
