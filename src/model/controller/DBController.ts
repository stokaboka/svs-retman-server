/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import {NextFunction, Request, Response} from 'express';

export default class DBController {

    protected repository: any;
    protected order: any = null;

    constructor(repository: any) {
        this.repository = repository;
    }

    public setOrder(order: any) {
        this.order = order;
        return this;
    }

    public async all(request: Request, response: Response, next: NextFunction) {
        return this.query();
    }

    public async find(request: Request, response: Response, next: NextFunction) {
        return this.query(request.params);
    }

    public async query(params?: any) {
        const options = this.getOptions(params);
        if (options) {
            return await  this.repository.find(options);
        } else {
            return await  this.repository.find();
        }
    }

    public async one(request: Request, response: Response, next: NextFunction) {
        const out = await this.repository.findOne(request.params.id);
        return out;
    }

    public async update(request: Request, response: Response, next: NextFunction) {
        const out = await this.repository.update(request.params.id, request.body);
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
        // const out = await this.repository.delete(request.params.id);
        const out = await this.repository.delete(request.params);
        return out;
    }

    private getOptions(params?: any): any {
        let out = {};
        if (this.order || params) {
            if (params) {
                out = Object.assign(out, {where: params});
            }
            if (this.order) {
                out = Object.assign(out, {order: this.order});
            }
            return out;
        } else {
            return null;
        }
    }

}
