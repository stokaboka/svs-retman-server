/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import {getRepository} from 'typeorm';
import WordsPair from '../entity/WordsPair';
import DBController from './DBController';

export default class WordsPairController extends DBController {

    constructor() {
        super(getRepository(WordsPair));
    }

}
