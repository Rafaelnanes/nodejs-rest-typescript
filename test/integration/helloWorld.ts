import * as HTTPStatus from 'http-status';
import { app, request, expect } from './config/helpers';

describe('Testes de Integração', () => {
    describe('GET /', () => {
        it('Deve retornar um Json com todos os usuários', done => {
            request(app)
                .get('/')
                .end((error, res) => {
                    expect(res.status).to.equal(HTTPStatus.OK);
                    done(error);
                })
        })
    })
});
