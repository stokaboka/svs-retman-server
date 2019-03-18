/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('Cue')
export default class Cue {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({
        name: 'file',
        type: 'varchar',
        length: 255,
    })
    public file: string;

    @Column({
        name: 'pos',
        type: 'double',
    })
    public pos: number;

}
