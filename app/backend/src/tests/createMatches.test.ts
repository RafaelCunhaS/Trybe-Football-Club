import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Response } from 'superagent';
import Match from '../database/models/Match.model';

chai.use(chaiHttp);

const { expect } = chai;

describe('Tests POST method for /matches', () => {
  describe('if the request is successful', () => {
    let chaiHttpResponse: Response;
    const userLogin = {
      email: 'test@example.com',
      password: 'secret_admin'
    }
    const insertedData = {
      "homeTeam": 16,
      "awayTeam": 8,
      "homeTeamGoals": 2,
      "awayTeamGoals": 2
    }
    const returnedData = {
      "id": 1,
      "homeTeam": 16,
      "homeTeamGoals": 2,
      "awayTeam": 8,
      "awayTeamGoals": 2,
      "inProgress": true,
    }

    before(() => sinon.stub(Match, 'create').resolves(returnedData as Match));

    after(() => (Match.create as sinon.SinonStub).restore())

    it('it should return the status code 201', async () => {
      const { body } = await chai.request(app).post('/login').send(userLogin);
      chaiHttpResponse = await chai.request(app)
        .post('/matches').set('authorization', body).send(insertedData);
  
      expect(chaiHttpResponse).to.have.status(201);
    });
    it('the body should return an object', () => {
      expect(chaiHttpResponse.body).to.be.an('object');
    });
    it('the object must contain all data from the match', () => {
      expect(chaiHttpResponse.body).to.have
        .keys('id', 'homeTeam', 'homeTeamGoals', 'awayTeam', 'awayTeamGoals', 'inProgress');
    });
  });
});
