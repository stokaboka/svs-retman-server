/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import {getRepository} from 'typeorm';
import Users from '../entity/Users';
import DBController from './DBController';
import {NextFunction, Request, Response} from 'express';

export default class UsersController extends DBController {

    constructor() {
        super(getRepository(Users));
    }

    /**
     * find one user by ID
     * @param request
     * @param response
     * @param next
     */
    public async one(request: Request, response: Response, next: NextFunction) {
        return this.repository.findOne(request.params.id);
    }

    /**
     * user login
     * @param request
     * @param response
     * @param next
     */
    public async login(request: Request, response: Response, next: NextFunction) {
        /*
        TODO add login code
         */
        return this.repository.find(
            {
                select: [ 'login', 'firstName', 'secondName', 'lastName', 'birthday' ],
                where: { login: request.params.login, password: request.params.password},
            });
    }

    /**
     * logout user
     * @param request
     * @param response
     * @param next
     */
    public async logout(request: Request, response: Response, next: NextFunction) {
        /*
        TODO add logout code
         */
        return this.one(request, response, next);
    }

    /**
     * register user
     * @param request
     * @param response
     * @param next
     */
    public async register(request: Request, response: Response, next: NextFunction) {
        return this.repository.save(request.body);
    }

}
