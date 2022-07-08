import TeamController from '../controller/Team.controller';
import TeamRepository from '../repository/TeamRepository';
import TeamService from '../service/Team.service';

export default () => {
  const model = new TeamRepository();
  const service = new TeamService(model);
  const controller = new TeamController(service);

  return controller;
};
