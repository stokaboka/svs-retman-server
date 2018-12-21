/*
 * Copyright (c) 2018. Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('Lessons')
export default class Lessons {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public stepId: number;

    @Column()
    public num: number;

    @Column({
        type: 'varchar',
        length: 255,
    })
    public title: string;

    @Column({
        type: 'varchar',
        length: 255,
    })
    public scope: string;

    @Column({
        type: 'varchar',
        length: 1000,
    })
    public briefText: string;

    @Column({
        type: 'varchar',
        length: 255,
    })
    public briefSound1: string;

    @Column({
        type: 'varchar',
        length: 255,
    })
    public briefSound2: string;

    @Column()
    public briefTime: number;

    @Column({
        type: 'varchar',
        length: 1000,
    })
    public testText: string;

    @Column({
        type: 'varchar',
        length: 255,
    })
    public testSound1: string;

    @Column({
        type: 'varchar',
        length: 255,
    })
    public testSound2: string;

    @Column()
    public testTime: number;

    @Column()
    public stages: number;

    @Column()
    public pages: number;
}
