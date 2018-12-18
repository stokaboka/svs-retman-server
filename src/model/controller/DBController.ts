/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import {NextFunction, Request, Response} from 'express';

export default class DBController {

    protected repository: any;

    constructor(repository: any) {
        this.repository = repository;
    }

    public async all(request: Request, response: Response, next: NextFunction) {
        const out = await  this.repository.find();
        return out;
    }

    public async one(request: Request, response: Response, next: NextFunction) {
        const out = await this.repository.findOne(request.params.id);
        return out;
    }

    public async save(request: Request, response: Response, next: NextFunction) {
        const out = await this.repository.save(request.body);
        return out;
    }

    public async remove(request: Request, response: Response, next: NextFunction) {
        const out = await this.repository.remove(request.params);
        return out;
    }

    public async delete(request: Request, response: Response, next: NextFunction) {
        const out = await this.repository.delete(request.params.id);
        return out;
    }

}
