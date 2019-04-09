/*
 * Copyright (c) 2018. Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('Phases')
export default class Phases {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public step: number;

    @Column()
    public phase: number;

    @Column()
    public num: number;

    @Column({
        type: 'varchar',
        length: 100,
    })
    public action: string;

    @Column({
        type: 'varchar',
        length: 100,
    })
    public result: string;

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
        length: 10000,
    })
    public text: string;

    @Column({
        type: 'varchar',
        length: 1000,
    })
    public sounds: string;

    @Column({
        type: 'varchar',
        length: 100,
    })
    public mode: string;

    @Column()
    public time: number;

    @Column()
    public next: number;

    @Column()
    public stages: number;

    @Column()
    public pages: number;

    @Column({
        type: 'varchar',
        length: 100,
    })
    public component: string;

    @Column()
    public soundVolume: number;

}
