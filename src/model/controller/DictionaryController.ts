/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import {NextFunction, Request, Response} from 'express';
import {getRepository} from 'typeorm';
import Dictionary from '../entity/Dictionary';
import DBController from './DBController';

export default class DictionaryController extends DBController {

    constructor() {
        super(getRepository(Dictionary));
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
