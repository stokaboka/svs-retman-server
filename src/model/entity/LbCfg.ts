/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import {Column, Entity, PrimaryColumn} from 'typeorm';

// `id`,
// `sname`, `host`, `basename`, `username`, `pass`,
// `failhost`,
// `soap_login`, `soap_password`, `soap_file`,
// `smssender`, `vibersender`

@Entity('lbcfg')
export default class LbCfg {
    @PrimaryColumn()
    public id: number;

    @Column({
        name: 'sname',
        type: 'varchar',
        length: 255,
    })
    public sName: string;

    @Column({
        name: 'host',
        type: 'varchar',
        length: 255,
    })
    public host: string;

    @Column({
        name: 'basename',
        type: 'varchar',
        length: 255,
    })
    public basename: string;

    @Column({
        name: 'username',
        type: 'varchar',
        length: 255,
    })
    public username: string;

    @Column({
        name: 'pass',
        type: 'varchar',
        length: 255,
    })
    public pass: string;

    @Column({
        name: 'failhost',
        type: 'varchar',
        length: 20,
    })
    public failHost: string;

    @Column({
        name: 'soap_login',
        type: 'varchar',
        length: 100,
    })
    public soapLogin: string;

    @Column({
        name: 'soap_password',
        type: 'varchar',
        length: 100,
    })
    public soapPassword: string;

    @Column({
        name: 'soap_file',
        type: 'varchar',
        length: 100,
    })
    public soapFile: string;

    @Column({
        name: 'smssender',
        type: 'varchar',
        length: 50,
    })
    public smsSender: string;

    @Column({
        name: 'vibersender',
        type: 'varchar',
        length: 20,
    })
    public viberSender: string;

}
