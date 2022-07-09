import { Router } from 'express';
import teamsFactory from '../factories/teamsFactory';

const router = Router();

router.get('/', (req, res) => teamsFactory().getAll(req, res));

router.get('/:id', (req, res) => teamsFactory().getById(req, res));

export default router;
