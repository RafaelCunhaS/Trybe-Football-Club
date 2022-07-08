import MatchController from '../controller/Match.controller';
import MatchRepository from '../repository/MatchRepository';
import MatchService from '../service/Match.service';

export default () => {
  const model = new MatchRepository();
  const service = new MatchService(model);
  const controller = new MatchController(service);

  return controller;
};
