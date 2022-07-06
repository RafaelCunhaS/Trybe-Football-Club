import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Users from '../database/models/User.model';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Seu teste', () => {
  const user = {
    id: 999,
    username: 'John',
    role: 'manager',
    email: 'test@example.com',
    password: 'encryptedPassword'
  }

  before(async () => {
    sinon
      .stub(Users, 'findOne').resolves(user as Users);
  });

  after(()=>{
    (Users.findOne as sinon.SinonStub).restore();
  })

  describe('caso a requisição seja resolvida com sucesso', () => {
    let chaiHttpResponse: Response;
    const user = {
      email: 'test@example.com',
      password: 'encryptedPassword'
    }

    before( async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send(user);
    });

    it('deve retornar código de status 200', () => {
      expect(chaiHttpResponse).to.have.status(200);
    });
    it('o corpo da resposta deve ser um objeto', () => {
      expect(chaiHttpResponse.body).to.be.a('object');
    });
    it('o objeto deve possuir a chave "token"', () => {
      expect(chaiHttpResponse.body).to.have.key('token');
    });
  });
});
