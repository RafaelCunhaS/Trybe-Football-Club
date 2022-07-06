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
  describe('caso todas informações não forem passadas corretamente', () => {
    let chaiHttpResponse: Response;

    before( async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: "non@existent.com",
        password: "123321"
      });
    });

    before(async () => {
      sinon
        .stub(Users, 'findOne').resolves(null);
    });
  
    after(()=>{
      (Users.findOne as sinon.SinonStub).restore();
    })

    it('deve retornar código de status 401', () => {
      expect(chaiHttpResponse).to.have.status(401);
    });
    it('o corpo deve retornar um objeto', () => {
      expect(chaiHttpResponse.body).to.be.a('object');
    });
    it('o objeto deve possuir a chave "message"', () => {
      expect(chaiHttpResponse.body).to.have.key('message');
    });
    it('o objeto deve possuir uma menssagem de erro "Some required fields are missing"', () => {
      expect(chaiHttpResponse.body.message).to.be.equal('Incorrect email or password');
    });
  });

  describe('caso o usuário não exista no BD', () => {
    let chaiHttpResponse: Response;

    before( async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: "test@example.com",
        password: "123321"
      });
    });

    before(async () => {
      sinon
        .stub(Users, 'findOne').resolves(null);
    });
  
    after(()=>{
      (Users.findOne as sinon.SinonStub).restore();
    })

    it('deve retornar código de status 401', () => {
      expect(chaiHttpResponse).to.have.status(401);
    });
    it('o corpo deve retornar um objeto', () => {
      expect(chaiHttpResponse.body).to.be.a('object');
    });
    it('o objeto deve possuir a chave "message"', () => {
      expect(chaiHttpResponse.body).to.have.key('message');
    });
    it('o objeto deve possuir uma menssagem de erro "Invalid fields"', () => {
      expect(chaiHttpResponse.body.message).to.be.equal('Incorrect email or password');
    });
  });

  describe('caso a requisição seja resolvida com sucesso', () => {
    let chaiHttpResponse: Response;
    const userInfo = {
      id: 999,
      username: 'John',
      role: 'manager',
      email: 'test@example.com',
      password: 'encryptedPassword'
    }
    const loginUser = {
      email: 'test@example.com',
      password: 'encryptedPassword'
    }
  
    before(async () => {
      sinon
        .stub(Users, 'findOne').resolves(userInfo as Users);
    });
  
    after(()=>{
      (Users.findOne as sinon.SinonStub).restore();
    })

    before( async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send(loginUser);
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
