import * as express from 'express';
import 'express-async-errors';
import LoginController from './controller/Login.controller';
import loginFactory from './factories/loginFactory';
import teamsFactory from './factories/teamsFactory';
import authToken from './middlewares/authToken';
import errorMiddleware from './middlewares/errorMiddleware';
import loginValidation from './middlewares/loginValidation';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');

      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);

    this.app.get(
      '/login/validate',
      authToken,
      (req, res) => LoginController.validateUser(req, res),
    );

    this.app.post('/login', loginValidation, (req, res) => loginFactory().userLogin(req, res));

    this.app.get('/teams', (req, res) => teamsFactory().getAll(req, res));

    this.app.get('/teams/:id', (req, res) => teamsFactory().getById(req, res));

    this.app.use(errorMiddleware);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
