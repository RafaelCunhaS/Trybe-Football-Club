import MatchController from '../controller/Match.controller';
import MatchRepository from '../repository/MatchRepository';
import MatchService from '../service/Match.service';
import TeamRepository from '../repository/TeamRepository';

export default () => {
  const model = new MatchRepository();
  const teamModel = new TeamRepository();
  const service = new MatchService(model, teamModel);
  const controller = new MatchController(service);

  return controller;
};
