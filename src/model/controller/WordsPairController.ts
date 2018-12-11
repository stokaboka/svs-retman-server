/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import {getRepository} from 'typeorm';
import WordsPair from '../entity/WordsPair';
import DBController from './DBController';
import {NextFunction, Request, Response} from 'express';

export default class WordsPairController extends DBController {

    constructor() {
        super(getRepository(WordsPair));
    }

    /**
     * get words for scope | lang1 | lang2
     * @param request
     * @param response
     * @param next
     */
    public async words(request: Request, response: Response, next: NextFunction) {

        return this.repository.find(
            {
                where: Object.assign({}, request.params),
            });
    }

}
