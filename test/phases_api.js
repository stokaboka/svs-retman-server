/*
 * Copyright (c) 2018. Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

const dotenv = require("dotenv");
dotenv.config();

process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
// const server = require('../dist/server');
const should = chai.should();
let expect = chai.expect;

chai.use(chaiHttp);

const host = `http://localhost:${process.env.PORT}`;

describe("Phases", () => {

    describe("/GET all PHASES", () => {
        it("it should GET ALL steps", (done) => {
            chai.request(host)
            .get("/ph")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("array");
                res.body.should.have.lengthOf(36);
                done();
            });
        });
    });

    describe("/GET PHASEs of STEPs", () => {

        it("it should GET STEP 1", (done) => {
            chai.request(host)
            .get("/ph/step/1")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("array");
                res.body.should.have.lengthOf(1);
                done();
            });
        });

        it("it should GET STEP 2", (done) => {
            chai.request(host)
                .get("/ph/step/2")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("array");
                    res.body.should.have.lengthOf(1);
                    done();
                });
        });

        it("it should GET STEP 3", (done) => {
            chai.request(host)
                .get("/ph/step/3")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("array");
                    res.body.should.have.lengthOf(5);
                    done();
                });
        });

        it("it should GET STEP 4", (done) => {
            chai.request(host)
                .get("/ph/step/4")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("array");
                    res.body.should.have.lengthOf(7);
                    done();
                });
        });

        it("it should GET STEP 5", (done) => {
            chai.request(host)
                .get("/ph/step/5")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("array");
                    res.body.should.have.lengthOf(6);
                    done();
                });
        });

        it("it should GET STEP 6", (done) => {
            chai.request(host)
                .get("/ph/step/6")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("array");
                    res.body.should.have.lengthOf(6);
                    done();
                });
        });

        it("it should GET STEP 7", (done) => {
            chai.request(host)
                .get("/ph/step/7")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("array");
                    res.body.should.have.lengthOf(3);
                    done();
                });
        });
    });

    // describe('/GET PHASEs of STEP 4', () => {
    //     it('it should GET STEP 4', (done) => {
    //         chai.request(host)
    //         .get('/ph/step/4')
    //         .end((err, res) => {
    //             res.should.have.status(200);
    //             res.body.should.be.a('array');
    //             res.body.should.have.lengthOf(5);
    //             done();
    //         });
    //     });
    // });
    //
    // describe('/GET PHASEs of STEP 6', () => {
    //     it('it should GET STEP 6', (done) => {
    //         chai.request(host)
    //         .get('/ph/step/6')
    //         .end((err, res) => {
    //             res.should.have.status(200);
    //             res.body.should.be.a('array');
    //             res.body.should.have.lengthOf(7);
    //             done();
    //         });
    //     });
    // });

});
