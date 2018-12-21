/*
 * Copyright (c) 2018. Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('Steps')
export default class Steps {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({
        type: 'varchar',
        length: 255,
    })
    public title: string;

    @Column()
    public lessons: number;

    @Column()
    public brief: number;

    @Column()
    public test: number;

    @Column()
    public learning: number;

    @Column({
        type: 'varchar',
        length: 1000,
    })
    public briefText: string;

}
