import * as HTTPStatus from 'http-status';
import { app, request, assert } from './config/helpers';
import Consts from '../../server/api/config/consts';
import server from '../../server/server';
let token;

describe('Integration Tests', () => {
    let user = { "login": "admin", "password": "admin" };
    describe('/POST login', function () {
        it('Should return token', (done) => {
            request(server)
                .post('/login')
                .send(user)
                .end(function (error, res) {
                    assert.equal(res.status, HTTPStatus.OK);
                    token = res.headers[Consts.TOKEN_HEADER];
                    assert.isNotNull(token);
                    done();
                });
        });
    });

    describe('GET /user', () => {
        it('Should return all users', done => {
            request(server)
                .get('/user')
                .set(Consts.TOKEN_HEADER, token)
                .end((error, res) => {
                    assert.isNotNull(res);
                    assert.equal(res.status, HTTPStatus.OK);
                    assert.equal(Consts.STATUS_SUCCESS, res.body.status);
                    assert.equal(1, res.body.data.length);
                    done(error);
                })
        })
    })
    
    describe('POST /user', () => {
        it('Should add an user', done => {
            let user = { "login": "admin23", "password": "admin" };
            request(server)
                .post('/user')
                .send(user)
                .set(Consts.TOKEN_HEADER, token)
                .end((error, res) => {
                    assert.isNotNull(res);
                    assert.equal(res.status, HTTPStatus.OK);
                    assert.equal(Consts.STATUS_SUCCESS, res.body.status);
                    assert.isNotNull(res.body.data);
                    done(error);
                })
        })
    })

    describe('POST /user', () => {
        it('Should return error message because user already exists', done => {
            request(server)
                .post('/user')
                .send(user)
                .set(Consts.TOKEN_HEADER, token)
                .end((error, res) => {
                    assert.isNotNull(res);
                    assert.equal(res.status, HTTPStatus.OK);
                    assert.equal(Consts.STATUS_ERROR, res.body.status);
                    done(error);
                })
        })
    })
});
