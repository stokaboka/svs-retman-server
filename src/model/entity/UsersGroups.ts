/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('UsersGroups')
export default class UsersGroups {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({
        name: 'user_id',
        type: 'int',
    })
    public userId: number;

    @Column({
        name: 'group_id',
        type: 'int',
    })
    public groupId: number;

}
