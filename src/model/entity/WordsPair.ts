/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('WordsPair')
export default class WordsPair {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({
        name: 'word1',
        type: 'varchar',
        length: 255,
        unique: true,
    })
    public word1: string;

    @Column({
        name: 'word2',
        type: 'varchar',
        length: 255,
    })
    public word2: string;

    @Column({
        name: 'lang1',
        type: 'char',
        length: 10,
    })
    public lang1: string;

    @Column({
        name: 'lang2',
        type: 'char',
        length: 10,
    })
    public lang2: string;

    @Column({
        name: 'scope',
        type: 'varchar',
        length: 255,
    })
    public test: string;

}
