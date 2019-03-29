/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import {NextFunction, Request, Response} from 'express';
import {getRepository} from 'typeorm';
import UsersResults from '../entity/UsersResults';
import DBController from './DBController';

export default class UsersResultsController extends DBController {

    constructor() {
        super(getRepository(UsersResults));
    }

    /**
     * get user results
     * @param request
     * @param response
     * @param next
     */
    public async results(request: Request, response: Response, next: NextFunction) {
        const {user} = request.body;
        const data = await this.repository.find(
            {
                where: {user},
            });
        console.log('results', data);
        return data;
    }

    /**
     * save results
     * @param request
     * @param response
     * @param next
     */
    public async save(request: Request, response: Response, next: NextFunction) {
        const out = await this.repository.save(request.body);
        return out;
    }

}
