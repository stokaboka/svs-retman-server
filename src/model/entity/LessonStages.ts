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
        length: 1000,
    })
    public text: string;

    @Column()
    public lesson: number;

    @Column()
    public stage: number;

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
