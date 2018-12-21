/*
 * Copyright (c) 2018. Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('LessonContent')
export default class LessonContent {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public stepId: number;

    @Column()
    public lessonNum: number;

}
