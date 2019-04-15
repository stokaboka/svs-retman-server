/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import {NextFunction, Request, Response} from 'express';
import {getRepository} from 'typeorm';
import Users from '../entity/Users';
import DBController from './DBController';

export default class AuthController extends DBController {

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

    public static comparePassword(savedPassword: string, verifiablePassword: string) {
        return savedPassword === verifiablePassword;
    }

    private aSelect = ['login', 'firstName', 'secondName', 'lastName', 'birthday', 'role'];

    constructor() {
        super(getRepository(Users));
    }

// public function(id: string, done: any) {
//         User.findById(id, function(err, user) {
//             done(err, user);
//         });
//     })
    /**
     * user login
     * @param request
     * @param response
     * @param next
     */
    public async login(request: Request, response: Response, next: NextFunction) {
        const {login, password} = request.body;
        const data = await this.findByLogin(login);
        // if (data.password && this.comparePassword(data.password, password)) {
        //
        // }
        // console.log('login', data);
        return data;
    }

    public async findByLogin(login: string) {
        const data = await this.repository.find({
            select: ['login', 'firstName', 'secondName', 'lastName', 'birthday', 'password', 'role'],
            where: {login},
        });
        // console.log('findByLogin', data);
        if (data.length > 0) {
            return data[0];
        } else {
            return{};
        }
    }

    public async findById(id: any): Promise<any> {
        // console.log('findById', data);
        return await this.repository.find({
            select: this.aSelect,
            where: {id},
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
        // const out = await this.one(request, response, next);
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
        return AuthController.fixObject(out);
    }

    /**
     * update user data
     * @param request
     * @param response
     * @param next
     */
    public async update(request: Request, response: Response, next: NextFunction) {
        const out = await super.update(request, response, next);
        return AuthController.fixObject(out);
    }

    /**
     * save user data
     * @param request
     * @param response
     * @param next
     */
    public async save(request: Request, response: Response, next: NextFunction) {
        const out = await super.save(request, response, next);
        return AuthController.fixObject(out);
    }
}
