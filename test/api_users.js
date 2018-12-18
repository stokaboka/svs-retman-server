/*
Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
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

const user = {
    id: 0,
    login: 'test',
    password: 'test',
    firstName: 'John',
    secondName: 'Lennon',
    lastName: 'Lord',
    birthday: new Date(2018, 1, 12)
};

const updUser = Object.assign({}, user, {firstName: 'Pol'});

describe('Users', () => {
    
    describe('/DELETE user', () => {
        it('it should DELETE test user', (done) => {
            chai.request(host)
            .delete(`/user/${user.id}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                expect(res.body).to.deep.have.keys('raw');
                expect(res.body.raw).to.deep.have.any.keys('affectedRows');
                expect(res.body).to.satisfy(
                    body => body.raw.affectedRows === 0 || body.raw.affectedRows === 1,
                    'raw.affectedRows must be 0 or 1'
                );
                done();
            });
        });
    });
    
    describe('/POST register', () => {
        it('it should INSERT a user', (done) => {
            chai.request(host)
            .post('/register')
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('id');
                res.body.should.have.property('login');
                res.body.should.have.property('firstName');
                res.body.should.have.property('secondName');
                res.body.should.have.property('lastName');
                res.body.should.have.property('birthday');
                res.body.should.not.have.property('password');
                done();
            });
        });
    });
    
    describe('/GET users', () => {
        it('it should GET ALL users', (done) => {
            chai.request(host)
            .get('/users')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
        });
    });
    
    describe('/PUT/:id user', () => {
        it('it should UPDATE user ', (done) => {
            chai.request(host)
            .put(`/user/${user.id}`)
            .send(updUser)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('id');
                res.body.should.not.have.property('password');
                done();
            });
        });
    });
    
});
