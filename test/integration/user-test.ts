import * as HTTPStatus from 'http-status';
import { app, request, assert } from './config/helpers';
var token;

describe('Integration Tests', () => {

    describe('/POST login', function () {
        var user = { "login": "admin", "password": "admin" };
        it('Should return token', (done) => {
            request(app)
                .post('/login')
                .send(user)
                .end(function (error, res) {
                    assert.equal(200, res.status);
                    token = res.headers['authorization'];
                    assert.isNotNull(token);
                    done();
                });
        });
    });

    describe('GET /user', () => {
        it('Should return all users', done => {
            request(app)
                .get('/user')
                .set('authorization', token)
                .end((error, res) => {
                    assert.isNotNull(res);
                    assert.equal(HTTPStatus.OK, res.status);
                    assert.equal(res.body.status, 1);
                    assert.equal(res.body.data.length, 1);
                    done(error);
                })
        })
    })

    describe('POST /user', () => {
        it('Should add an user', done => {
            var user = { "login": "admin23", "password": "admin" };
            request(app)
                .post('/user')
                .send(user)
                .set('authorization', token)
                .end((error, res) => {
                    assert.isNotNull(res);
                    assert.equal(HTTPStatus.OK, res.status);
                    assert.equal(res.body.status, 1);
                    assert.isNotNull(res.body.data);
                    done(error);
                })
        })
    })

    describe('POST /user', () => {
        it('Should return error message because user already exists', done => {
            var user = { "login": "admin", "password": "admin" };
            request(app)
                .post('/user')
                .send(user)
                .set('authorization', token)
                .end((error, res) => {
                    assert.isNotNull(res);
                    assert.equal(HTTPStatus.OK, res.status);
                    assert.equal(res.body.status, 0);
                    done(error);
                })
        })
    })
});
