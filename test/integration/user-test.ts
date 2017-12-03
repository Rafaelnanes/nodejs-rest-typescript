import * as HTTPStatus from 'http-status';
import { app, request, assert } from './config/helpers';
import Consts from '../../server/api/config/consts';
import SequelizeMigration from '../../server/config/sequelize-migration';
const models = require('../../server/models');

let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTExNjA4NTY3LCJleHAiOjE1MTE2MDg1Njd9.HO2fGlTNMyTGcw98cW--a922FNI3_YZd80ij76f14bU';

before((done) => {
    models.sequelize.sync().then(() => {
        SequelizeMigration.migrateOnTest().then(() => {
            done();
        });
    })
});

describe('Integration Tests', () => {
    let user = { login: "admin", password: "admin", profileId: 1 };

    describe('/POST login', function () {
        it('Should return token', (done) => {
            request(app)
                .post('/login')
                .send(user)
                .end(function (error, res) {
                    assert.equal(res.status, HTTPStatus.OK);
                    token = res.headers[Consts.TOKEN_HEADER].split('||')[1];
                    assert.isNotNull(token);
                    done();
                });
        });
    });

    describe('GET /user', () => {
        it('Should return all users', done => {
            request(app)
                .get('/user')
                .set(Consts.TOKEN_HEADER, token)
                .end((error, res) => {
                    assert.isNotNull(res);
                    assert.equal(res.status, HTTPStatus.OK);
                    assert.equal(2, res.body.data.length);
                    done(error);
                })
        })
    })

    describe('POST /user', () => {
        it('Should add an user', done => {
            let user = { login: "admin23", password: "admin", profileId: 1 };
            request(app)
                .post('/user')
                .send(user)
                .set(Consts.TOKEN_HEADER, token)
                .end((error, res) => {
                    assert.isNotNull(res);
                    assert.equal(res.status, HTTPStatus.OK);
                    assert.isNotNull(res.body.data);
                    done(error);
                })
        })
    })

    describe('POST /user', () => {
        it('Should return error message because user already exists', done => {
            request(app)
                .post('/user')
                .send(user)
                .set(Consts.TOKEN_HEADER, token)
                .end((error, res) => {
                    assert.isNotNull(res);
                    assert.equal(res.status, HTTPStatus.CONFLICT);
                    done(error);
                })
        })
    })
});
