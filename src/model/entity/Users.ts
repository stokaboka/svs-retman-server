/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('Users')
export default class Groups {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({
        name: 'login',
        type: 'varchar',
        length: 255,
        unique: true,
    })
    public login: string;

    @Column({
        name: 'password',
        type: 'varchar',
        length: 255,
    })
    public password: string;

    @Column({
        name: 'firstName',
        type: 'varchar',
        length: 255,
    })
    public firstName: string;

    @Column({
        name: 'secondName',
        type: 'varchar',
        length: 255,
    })
    public secondName: string;

    @Column({
        name: 'lastName',
        type: 'varchar',
        length: 255,
    })
    public lastName: string;

    @Column({
        name: 'birthday',
        type: 'datetime',
    })
    public birthday: Date;

}
