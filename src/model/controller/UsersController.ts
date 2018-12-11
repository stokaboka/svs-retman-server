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

    public async one(request: Request, response: Response, next: NextFunction) {
        return this.repository.findOne(request.params.login, request.params.password);
    }

    public async login(request: Request, response: Response, next: NextFunction) {
        return this.repository.find(
            {
                select: ["firstName", ]
            }
        );
    }

    public async logout(request: Request, response: Response, next: NextFunction) {
        return this.one(request, response, next);
    }

    public async register(request: Request, response: Response, next: NextFunction) {
        return this.repository.save(request.body);
    }

}
