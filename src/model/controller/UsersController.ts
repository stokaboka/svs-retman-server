/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import {NextFunction, Request, Response} from 'express';
import {getRepository, Like} from 'typeorm';
import Users from '../entity/Users';
import DBController from './DBController';

export default class UsersController extends DBController {

    /**
     * remove password field from object
     * @param obj
     */
    public static fixObject(obj: any) {
        if (obj.password) {
            delete obj.password;
        }
        return obj;
    }

    private aSelect = [ 'login', 'firstName', 'secondName', 'lastName', 'birthday', 'role' ];

    constructor() {
        super(getRepository(Users));
    }

    /**
     * all users
     * @param request
     * @param response
     * @param next
     */
    public async users(request: Request, response: Response, next: NextFunction) {
        const {search} = request.body;
        if (search) {
            return this.repository.find({
                select: ['id'].concat(this.aSelect),
                where: [
                    {login: Like(`%${search}%`) },
                    {firstName: Like(`%${search}%`)},
                    {secondName: Like(`%${search}%`)},
                    {lastName: Like(`%${search}%`)},
                ],
            });
        } else {
            return this.repository.find({ select: this.aSelect });
        }
    }

    /**
     * search users
     * @param request
     * @param response
     * @param next
     */
    public async search(request: Request, response: Response, next: NextFunction) {
        const {page, limit, sortBy, descending, filter} = request.query;
        // console.log('params', request.params);
        // console.log('body', request.body);
        // console.log('query', request.query);

        const select = ['id'].concat(this.aSelect);

        let where: any[] = [];
        if (filter) {
            where = [
                {login: Like(`%${filter}%`) },
                {firstName: Like(`%${filter}%`)},
                {secondName: Like(`%${filter}%`)},
                {lastName: Like(`%${filter}%`)},
            ];
        }

        const order: any = {};

        if (sortBy) {
            order[sortBy] = descending === 'true' ? 'DESC' : 'ASC';
        }

        const take = limit || 10;
        const skip = ((page || 1) - 1) * (limit || 0);

        const [result, total] = await this.repository.findAndCount({
                select,
                where,
                order,
                take,
                skip,
            });

        return {
            rows: result,
            rowsNumber: total,
        };
    }

    /**
     * user login
     * @param request
     * @param response
     * @param next
     */
    public async login(request: Request, response: Response, next: NextFunction) {
        const {login, password} = request.body;
        const data = await this.repository.find(
            {
                select: this.aSelect,
                where: {login, password},
            });
        console.log('login', data);
        return data;
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
        const out = await this.one(request, response, next);
        // return UsersController.fixObject(out);
        return {};
    }

    /**
     * register user
     * @param request
     * @param response
     * @param next
     */
    public async register(request: Request, response: Response, next: NextFunction) {
        const out = await this.repository.save(request.body);
        return UsersController.fixObject(out);
    }

    /**
     * update user data
     * @param request
     * @param response
     * @param next
     */
    public async update(request: Request, response: Response, next: NextFunction) {
        const out = await super.update(request, response, next);
        return UsersController.fixObject(out);
    }

    /**
     * save user data
     * @param request
     * @param response
     * @param next
     */
    public async save(request: Request, response: Response, next: NextFunction) {
        const out = await super.save(request, response, next);
        // console.log(out);
        return UsersController.fixObject(out);
    }

}
