/*
 * Copyright (c) 2018. Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

const dotenv = require('dotenv');
dotenv.config();

process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
// const server = require('../dist/server');
const should = chai.should();
let expect = chai.expect;

chai.use(chaiHttp);

const host = `http://localhost:${process.env.PORT}`;

describe('LessonStages', () => {
    
    describe('/GET all LessonStages', () => {
        it('it should GET ALL LessonStages', (done) => {
            chai.request(host)
            .get('/ls')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.should.have.lengthOf(28);
                done();
            });
        });
    });
    
    describe('/GET EN language of a LessonStages', () => {
        it('it should GET EN language of a LessonStages', (done) => {
            chai.request(host)
            .get('/ls/lang/EN')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.should.have.lengthOf(16);
                done();
            });
        });
    });
    
    describe('/GET DE language of a LessonStages', () => {
        it('it should GET DE language of a LessonStages', (done) => {
            chai.request(host)
            .get('/ls/lang/DE')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.should.have.lengthOf(8);
                done();
            });
        });
    });
    
    describe('/GET FR language of a LessonStages', () => {
        it('it should GET FR language of a LessonStages', (done) => {
            chai.request(host)
            .get('/ls/lang/FR')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.should.have.lengthOf(4);
                done();
            });
        });
    });
    
});
