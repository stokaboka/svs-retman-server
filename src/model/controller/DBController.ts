/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import {NextFunction, Request, Response} from 'express';

export default class DBController {

    private repository: any;

    constructor(repository: any) {
        this.repository = repository;
    }

    public async all(request: Request, response: Response, next: NextFunction) {
        return this.repository.find();
    }

    public async one(request: Request, response: Response, next: NextFunction) {
        return this.repository.findOne(request.params.id);
    }

    public async save(request: Request, response: Response, next: NextFunction) {
        return this.repository.save(request.body);
    }

    public async remove(request: Request, response: Response, next: NextFunction) {
        const instance = await this.repository.findOne(request.params.id);
        await this.repository.remove(instance);
    }

}
