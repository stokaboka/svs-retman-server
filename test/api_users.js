/*
Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
*/

"use strict";

const dotenv = require("dotenv");
dotenv.config();

process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
// Const server = require("../dist/server");
const should = chai.should();
let expect = chai.expect;

chai.use(chaiHttp);

const host = `http://localhost:${process.env.PORT}`;

let user = {
    // Id: 0,
    login: "test1",
    password: "test1",
    firstName: "John",
    secondName: "Lennon",
    lastName: "Lord",
    birthday: new Date(2018, 1, 12)
};

const login = { login: "test", password: "test" };
let token = "";

describe("Users", () => {

    after((done) => {
        chai.request(host)
            .post("/logout")
            .send()
            .end((err, res) => {
                res.should.have.status(401);
                done();
            });
        });

    it("it should REGISTER a user", (done) => {
        chai.request(host)
        .post("/register")
        .send(user)
        .end((err, res) => {
            if(res.body.error) {
                console.log(res.body.error);
            }
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("token");
            res.body.should.have.property("user");

            res.body.user.should.have.property("login");
            res.body.user.should.have.property("firstName");
            res.body.user.should.have.property("secondName");
            res.body.user.should.have.property("lastName");
            res.body.user.should.have.property("birthday");
            res.body.user.should.not.have.property("password");

            expect(res.body.token).to.not.be.null;
            expect(res.body.user).to.not.be.null;
            expect(res.body.error).to.be.null;

            user = res.body.user;
            token = res.body.token;

            done();
        });
    });

    it("it should REGISTER same user with error", (done) => {
        chai.request(host)
            .post("/register")
            .send(user)
            .end((err, res) => {

                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.should.have.property("token");
                res.body.should.have.property("user");
                res.body.should.have.property("error");

                expect(res.body.error).to.not.be.null;
                expect(res.body.error).to.be.equal('Пользователь с таким именем уже зарегистрирован');
                expect(res.body.token).to.be.equal('');
                expect(res.body.user).to.be.null;

                done();
            });
    });

    it("it should GET ALL users", (done) => {
        chai.request(host)
        .get("/users")
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("array");
            done();
        });
    });

    it("it should LOGOUT user", (done) => {
        chai.request(host)
            .post("/logout")
            .send()
            .end((err, res) => {
                res.should.have.status(401);
                token = "";
                done();
            });
    });

    it("it should LOGIN user with admin role", (done) => {
            chai.request(host)
                .post("/login")
                .send(login)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    res.body.should.have.property("token");
                    res.body.should.have.property("user");

                    expect(res.body.user).to.not.be.null;
                    expect(res.body.token).to.not.be.null;

                    token = res.body.token;
                    const loginUser = res.body.user;

                    loginUser.should.have.property("id");
                    loginUser.should.have.property("login");
                    loginUser.should.have.property("firstName");
                    loginUser.should.have.property("secondName");
                    loginUser.should.have.property("lastName");
                    loginUser.should.have.property("birthday");
                    loginUser.should.not.have.property("password");

                    done();
                });
    });

        it("it should UPDATE user ", (done) => {
            user.secondName = 'Cat';
            chai.request(host)
                .put(`/user/${user.id}`)
                .set("Authorization", `Bearer ${token}`)
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    expect(res.body).to.deep.have.keys([ "generatedMaps", "raw"]);
                    expect(res.body.raw).to.deep.have.any.keys("affectedRows");
                    expect(res.body).to.satisfy(
                        body => body.raw.changedRows === 1 && body.raw.affectedRows === 1,
                        "raw.changedRows and raw.affectedRows must be 1",
                    );
                    done();
                });
        });

    // describe("/DELETE user", () => {
     it("it should DELETE test user by login", (done) => {
        chai.request(host)
        .delete(`/user/${user.id}`)
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            expect(res.body).to.deep.have.keys("raw");
            expect(res.body.raw).to.deep.have.any.keys("affectedRows");
            expect(res.body).to.satisfy(
                body => body.raw.affectedRows === 0 || body.raw.affectedRows === 1,
                "raw.affectedRows must be 0 or 1",
            );
            done();
        });
    });

});
