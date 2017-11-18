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

    describe('GET /', () => {
        it('Should return all users', done => {
            request(app)
                .get('/user')
                .set('authorization', token)
                .end((error, res) => {
                    assert.isNotNull(res);
                    assert.equal(HTTPStatus.OK, res.status);
                    assert.equal(res.body.length, 1);
                    done(error);
                })
        })
    })
});
