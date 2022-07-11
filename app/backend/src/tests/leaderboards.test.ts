import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { ILeaderboard } from '../interfaces/Leaderboard.interface';
import { Response } from 'superagent';
import Team from '../database/models/Team.model';

chai.use(chaiHttp);

const { expect } = chai;

describe('Tests GET method for /leaderboards', () => {
  describe('if the route requested is /leaderboards/home', () => {
    let chaiHttpResponse: Response;
    const homeLeaderboard = [
      {
        name: 'Santos',
        totalPoints: 9,
        totalGames: 3,
        totalVictories: 3,
        totalDraws: 0,
        totalLosses: 0,
        goalsFavor: 9,
        goalsOwn: 3,
        goalsBalance: 6,
        efficiency: 100
      },
      {
        name: 'Palmeiras',
        totalPoints: 7,
        totalGames: 3,
        totalVictories: 2,
        totalDraws: 1,
        totalLosses: 0,
        goalsFavor: 10,
        goalsOwn: 5,
        goalsBalance: 5,
        efficiency: 77.78
      }
    ]
    const TeamsMatches = [
      {
        "id": 12,
        "teamName": "Palmeiras",
        "teamHome": [
          {
            "id": 7,
            "homeTeam": 12,
            "homeTeamGoals": 2,
            "awayTeam": 6,
            "awayTeamGoals": 2,
            "inProgress": false
          },
          {
            "id": 18,
            "homeTeam": 12,
            "homeTeamGoals": 4,
            "awayTeam": 5,
            "awayTeamGoals": 2,
            "inProgress": false
          },
          {
            "id": 40,
            "homeTeam": 12,
            "homeTeamGoals": 4,
            "awayTeam": 8,
            "awayTeamGoals": 1,
            "inProgress": false
          }
        ]
      },
      {
        "id": 14,
        "teamName": "Santos",
        "teamHome": [
          {
            "id": 14,
            "homeTeam": 14,
            "homeTeamGoals": 2,
            "awayTeam": 16,
            "awayTeamGoals": 1,
            "inProgress": false
          },
          {
            "id": 32,
            "homeTeam": 14,
            "homeTeamGoals": 5,
            "awayTeam": 11,
            "awayTeamGoals": 1,
            "inProgress": false
          },
          {
            "id": 38,
            "homeTeam": 14,
            "homeTeamGoals": 2,
            "awayTeam": 4,
            "awayTeamGoals": 1,
            "inProgress": false
          }
        ]
      }
    ]

    before(() => sinon.stub(Team, 'findAll').resolves(TeamsMatches as Team[]));

    after(() => (Team.findAll as sinon.SinonStub).restore())

    it('it should return the status code 200', async () => {
      chaiHttpResponse = await chai.request(app).get('/leaderboard/home');
  
      expect(chaiHttpResponse).to.have.status(200);
    });
    it('the body should return an array', () => {
      expect(chaiHttpResponse.body).to.be.an('array');
    });
    it('the array must contain all the correct info for the leaderboard', () => {
      expect(chaiHttpResponse.body).to.have.eql(homeLeaderboard);
    });
  });
});
