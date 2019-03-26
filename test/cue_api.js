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

const files = {
    ENG: [
        { file: 'less1_eng-ru.mp3', rows: 48 },
        { file: 'less1_eng.mp3', rows: 48 },
        { file: 'less2_eng-ru.mp3', rows: 65 },
        { file: 'less2_eng.mp3', rows: 65 },
        { file: 'less3_eng-ru.mp3', rows: 67 },
        { file: 'less3_eng.mp3', rows: 67 },
        { file: 'less4_eng-ru.mp3', rows: 59 },
        { file: 'less4_eng.mp3', rows: 59 },
    ],
    DEU: [
        { file: 'less1_deu-ru.mp3', rows: 60 },
        { file: 'less1_deu.mp3', rows: 60 },
        { file: 'less2_deu-ru.mp3', rows: 21 },
        { file: 'less2_deu.mp3', rows: 21 },
    ],
    FRE: [
        { file: 'less1_fre-ru.mp3', rows: 56 },
        { file: 'less1_fre.mp3', rows: 56 },
        { file: 'less2_fre-ru.mp3', rows: 53 },
        { file: 'less2_fre.mp3', rows: 53 },
    ]
}

let contAllCues = 0

describe('Cue', () => {

    for(lang in files) {

        describe(`/GET ${lang} CUEs of files `, () => {
            const _lang = lang
            for (mp3 of files[_lang]) {
                const { file, rows } = mp3
                contAllCues += rows
                it(`it should GET CUES of ${file} file (${_lang})`, (done) => {
                    chai.request(host)
                        .get(`/cue/file/${file}`)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('array');
                            res.body.should.have.lengthOf(rows);
                            done();
                        });
                });
            }

        });

    }

    describe('/GET all CUEs', () => {
        it('it should GET ALL cues', (done) => {
            chai.request(host)
                .get('/cue')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.should.have.lengthOf(contAllCues);
                    done();
                });
        });
    });

});
