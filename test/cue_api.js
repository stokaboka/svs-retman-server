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

describe('Cue', () => {
    describe('/GET all CUEs', () => {
        it('it should GET ALL cues', (done) => {
            chai.request(host)
            .get('/cue')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.should.have.lengthOf(80);
                done();
            });
        });
    });

    describe('/GET CUEs of files ', () => {
        it('it should GET CUES of less1_eng-ru.mp3 file', (done) => {
            chai.request(host)
                .get('/cue/file/less1_eng-ru.mp3')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.should.have.lengthOf(20);
                    done();
                });
        });

        it('it should GET CUES of less1_eng.mp3 file', (done) => {
            chai.request(host)
                .get('/cue/file/less1_eng.mp3')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.should.have.lengthOf(48);
                    done();
                });
        });

    });
    
});
