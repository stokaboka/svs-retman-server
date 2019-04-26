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

const dictionaries = [
    {lang1: 'DE', lang2: 'RU', scope: 'test::lesson::1', cnt: '60'},
    {lang1: 'DE', lang2: 'RU', scope: 'test::lesson::2', cnt: '21'},
    {lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn', cnt: '100'},
    {lang1: 'DE', lang2: 'RU', scope: 'vocabulary::learn::01', cnt: '100'},
    {lang1: 'DE', lang2: 'RU', scope: 'vocabulary::test', cnt: '25'},
    {lang1: 'EN', lang2: 'RU', scope: 'test::lesson::1', cnt: '48'},
    {lang1: 'EN', lang2: 'RU', scope: 'test::lesson::2', cnt: '65'},
    {lang1: 'EN', lang2: 'RU', scope: 'test::lesson::3', cnt: '67'},
    {lang1: 'EN', lang2: 'RU', scope: 'test::lesson::4', cnt: '59'},
    {lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn', cnt: '100'},
    {lang1: 'EN', lang2: 'RU', scope: 'vocabulary::learn::01', cnt: '100'},
    {lang1: 'EN', lang2: 'RU', scope: 'vocabulary::test', cnt: '25'},
    {lang1: 'FR', lang2: 'RU', scope: 'test::lesson::1', cnt: '56'},
    {lang1: 'FR', lang2: 'RU', scope: 'test::lesson::2', cnt: '53'},
    {lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn', cnt: '100'},
    {lang1: 'FR', lang2: 'RU', scope: 'vocabulary::learn::01', cnt: '100'},
    {lang1: 'FR', lang2: 'RU', scope: 'vocabulary::test', cnt: '25'},
    {lang1: 'RU', lang2: 'RU', scope: 'mnemic::test', cnt: '50'},
    {lang1: 'RU', lang2: 'RU', scope: 'mnemic::test::01', cnt: '50'}
]

describe('Dictionary', () => {

    describe('/GET all dictionary words', () => {
        it('it should GET ALL words from dictionary', (done) => {
            chai.request(host)
            .get('/words')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.should.have.lengthOf(0);
                done();
            });
        });
    });

    describe('/GET dictionary words for scopes', () => {
        for (dd of dictionaries) {
            const d = dd;
            it(`it should GET words for lang1: ${d.lang1} lang2: ${d.lang2} scope: ${d.scope}`, (done) => {
                chai.request(host)
                    .get(`/words/scope/${d.scope}/lang1/${d.lang1}/lang2/${d.lang2}`)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        res.body.should.have.lengthOf(d.cnt);
                        done();
                    });
            });
        }
    });
/*
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
*/
});
