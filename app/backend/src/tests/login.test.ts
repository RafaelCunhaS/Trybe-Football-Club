import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Users from '../database/models/User.model';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Tests POST mothod for /login', () => {
  describe('if the request is made with a invalid email', () => {
    let chaiHttpResponse: Response;

    it('it should return the status code 400', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: "n.on@exis@tent.com",
        password: "123321"
      });
  
      expect(chaiHttpResponse).to.have.status(400);
    });
    it('the body should return an object', () => {
      expect(chaiHttpResponse.body).to.be.a('object');
    });
    it('the object must have the key "message"', () => {
      expect(chaiHttpResponse.body).to.have.key('message');
    });
    it('"message" should have the error message "All fields must be filled"', () => {
      expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled');
    });
  });

  describe('if the request is made with a invalid password', () => {
    let chaiHttpResponse: Response;

    it('it should return the status code 400', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: "test@example.com",
        password: "1234"
      });
  
      expect(chaiHttpResponse).to.have.status(400);
    });
    it('the body should return an object', () => {
      expect(chaiHttpResponse.body).to.be.a('object');
    });
    it('the object must have the key "message"', () => {
      expect(chaiHttpResponse.body).to.have.key('message');
    });
    it('"message" should have the error message "All fields must be filled"', () => {
      expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled');
    });
  });

  describe('if the email isn\'t registered', () => {
    let chaiHttpResponse: Response;

    before(() => {
      sinon
        .stub(Users, 'findOne').resolves(null);
    });
  
    after(()=>{
      (Users.findOne as sinon.SinonStub).restore();
    })

    it('it should return the status code 401', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: "non@existent.com",
        password: "123321"
      });
  
      expect(chaiHttpResponse).to.have.status(401);
    });
    it('the body should return an object', () => {
      expect(chaiHttpResponse.body).to.be.a('object');
    });
    it('the object must have the key "message"', () => {
      expect(chaiHttpResponse.body).to.have.key('message');
    });
    it('"message" should have the error message "Incorrect email or password"', () => {
      expect(chaiHttpResponse.body.message).to.be.equal('Incorrect email or password');
    });
  });

  describe('if the password is incorrect', () => {
    let chaiHttpResponse: Response;

    before(() => {
      sinon
        .stub(Users, 'findOne').resolves(null);
    });
  
    after(()=>{
      (Users.findOne as sinon.SinonStub).restore();
    })

    it('it should return the status code 401', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: "test@example.com",
        password: "invalidPassword"
      });

      expect(chaiHttpResponse).to.have.status(401);
    });
    it('the body should return an object', () => {
      expect(chaiHttpResponse.body).to.be.a('object');
    });
    it('the object must have the key "message"', () => {
      expect(chaiHttpResponse.body).to.have.key('message');
    });
    it('"message" should have the error message "Incorrect email or password"', () => {
      expect(chaiHttpResponse.body.message).to.be.equal('Incorrect email or password');
    });
  });

  describe('if the request is resolved with success', () => {
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
  
    before(() => {
      sinon
        .stub(Users, 'findOne').resolves(userInfo as Users);
    });
  
    after(()=>{
      (Users.findOne as sinon.SinonStub).restore();
    })

    it('it should return the status code 200', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send(loginUser);
      
      expect(chaiHttpResponse).to.have.status(200);
    });
    it('the body should return an object', () => {
      expect(chaiHttpResponse.body).to.be.a('object');
    });
    it('the object must have the key "token"', () => {
      expect(chaiHttpResponse.body).to.have.key('token');
    });
  });
});
