/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('UsersGroups')
export default class UsersGroups {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({
        type: 'int',
    })
    public idUser: number;

    @Column({
        type: 'int',
    })
    public idGroup: number;

}
