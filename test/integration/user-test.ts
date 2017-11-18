import * as HTTPStatus from 'http-status';
import { app, request, assert } from './config/helpers';

describe('Testes de Integração', () => {
    describe('GET /', () => {
        it('Should return all users', done => {
            request(app)
                .get('/user')
                .end((error, res) => {
                    assert.isNotNull(res);
                    assert.equal(HTTPStatus.OK, res.status);
                    assert.equal(res.body.length, 1);
                    done(error);
                })
        })
    })
});
