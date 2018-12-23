/*
 * Copyright (c) 2018. Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('LessonStages')
export default class LessonStages {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({
        type: 'varchar',
        length: 255,
    })
    public lang: string;

    @Column({
        type: 'varchar',
        length: 1000,
    })
    public briefText: string;

    @Column()
    public stepId: number;

    @Column()
    public phaseNum: number;

    @Column()
    public lesson: number;

    @Column()
    public stage: number;

    @Column({
        type: 'varchar',
        length: 255,
    })
    public scope: string;

    @Column({
        type: 'varchar',
        length: 255,
    })
    public sound: string;

    @Column()
    public time: number;

}
