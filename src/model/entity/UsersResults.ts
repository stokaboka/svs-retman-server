/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('UsersResults')
export default class UsersResults {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({
        name: 'user',
        type: 'varchar',
        length: 255,
        unique: true,
    })
    public user: string;

    @Column({
        name: 'results',
        type: 'text',
    })
    public results: string;

    @Column({
        name: 'date',
        type: 'datetime',
        default: new Date(),
    })
    public date: Date;
}
