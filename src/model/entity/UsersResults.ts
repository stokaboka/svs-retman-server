/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('UsersResults')
export default class UsersResults {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({
        type: 'varchar',
        length: 255,
        unique: true,
    })
    public user: string;

    @Column({
        type: 'text',
    })
    public results: string;

    @Column({
        type: 'text',
    })
    public testing: string;

    @Column()
    public rating: number;

    @Column({
        type: 'datetime',
        default: new Date(),
    })
    public date: Date;
}
