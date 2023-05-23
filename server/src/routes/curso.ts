import { Router } from 'express';
import { getCursos } from '../controllers/curso';
import validateToken from './validate_token';

const router = Router();

router.get('/', validateToken, getCursos);

export default router;