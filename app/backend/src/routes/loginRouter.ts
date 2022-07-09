import { Router } from 'express';
import LoginController from '../controller/Login.controller';
import loginFactory from '../factories/loginFactory';
import authToken from '../middlewares/authToken';
import loginValidation from '../middlewares/loginValidation';

const router = Router();

router.get(
  '/validate',
  authToken,
  (req, res) => LoginController.validateUser(req, res),
);

router.post('/', loginValidation, (req, res) => loginFactory().userLogin(req, res));

export default router;
