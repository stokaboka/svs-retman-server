/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import {NextFunction, Request, Response} from 'express';
import {getRepository} from 'typeorm';
import UsersResults from '../entity/UsersResults';
import DBController from './DBController';

import TestingMethods from './testing/TestingMethods';

export default class UsersResultsController extends DBController {

    private methods: TestingMethods = new TestingMethods();

    constructor() {
        super(getRepository(UsersResults));
    }

    public async result(request: Request, response: Response, next: NextFunction) {
        const data = await this.repository.find(
            {
                select: ['user', 'testing', 'rating', 'date'],
                where: request.params,
                order: {date: 'DESC'},
                // skip: 0,
                take: 1,
            });
        console.log('results', data);
        return data;
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
                order: {date: 'DESC'},
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
    public async calc(request: Request, response: Response, next: NextFunction) {
        const user = request.body.user;
        const results = request.body.results;
        const result = this.methods.calculate(results);
        const testing = JSON.stringify(result);
        const rating = result.reduce((accumulator, e) => accumulator + e.result, 0);
        const date = request.body.date;
        const data = {user, results, testing, rating, date};
        return await this.repository.save(data);
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
