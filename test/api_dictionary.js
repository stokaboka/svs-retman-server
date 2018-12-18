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

describe('Dictionary', () => {
    
    describe('/GET all dictionary words', () => {
        it('it should GET ALL words from dictionary', (done) => {
            chai.request(host)
            .get('/words')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
        });
    });
    
    describe('/GET dictionary words for scope', () => {
        it('it should GET words for scope', (done) => {
            chai.request(host)
            .get('/words/scope/0')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
        });
    });
    
    describe('/GET dictionary words for scope & lang 1', () => {
        it('it should GET words for lang 1 & scope', (done) => {
            chai.request(host)
            .get('/words/scope/0/lang1/RU')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
        });
    });
    
    describe('/GET dictionary words for scope & lang 2', () => {
        it('it should GET words for lang 2 & scope', (done) => {
            chai.request(host)
            .get('/words/scope/0/lang2/EN')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
        });
    });
    
    describe('/GET dictionary words for scope & lang 1 & lang 2', () => {
        it('it should GET words for lang 2 & scope', (done) => {
            chai.request(host)
            .get('/words/scope/0/lang1/RU/lang2/EN')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
        });
    });
    
});
