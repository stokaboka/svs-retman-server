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

chai.use(chaiHttp);

const host = `http://localhost:${process.env.PORT}`;

const user = { id: 0, login: 'test', password: 'test', firstName: 'John', secondName: 'Lennon', lastName: 'Lord', birthday: new Date(2018, 1, 12)};

describe('Users', () => {
    
    /**
     * TODO clear data before run tests
     */
    
    beforeEach((done) => {
        // console.log('USERS beforeEach');
        done();
    });
    
    describe('/GET users', () => {
        it('it should GET ALL users', (done) => {
            chai.request(host)
            .get('/users')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                // res.body.length.should.be.eql(0);
                done();
            });
        });
    });
    
    describe('/PUT/:id user', () => {
        it('it should UPDATE user ', (done) => {
            chai.request(host)
            .put(`/user/${user.id}`)
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('id');
                // res.body.errors.should.have.property('pages');
                // res.body.errors.pages.should.have.property('kind').eql('required');
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
                    // res.body.should.have.property('message').eql('User registered');
                    res.body.should.have.property('id');
                    res.body.should.have.property('login');
                    done();
                });
        });
    });
    //
    // describe('/GET login', () => {
    //     it('it should GET login user', (done) => {
    //         chai.request(host)
    //         .get('/login')
    //         .end((err, res) => {
    //             res.should.have.status(200);
    //             res.body.should.be.a('object');
    //             res.body.should.have.property('message').eql('User login');
    //             res.body.should.have.property('id').eql(0);
    //             done();
    //         });
    //     });
    // });
    
});
