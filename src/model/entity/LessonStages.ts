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
    public lessonNum: number;

    @Column()
    public lessons: number;

    @Column()
    public stage: number;

    @Column()
    public pages: number;

    @Column()
    public page1: number;

    @Column()
    public page2: number;

    @Column({
        type: 'varchar',
        length: 255,
    })
    public scope: string;

    @Column({
        type: 'varchar',
        length: 255,
    })
    public sound1: string;

    @Column({
        type: 'varchar',
        length: 255,
    })
    public sound2: string;

    @Column()
    public time: number;

}
