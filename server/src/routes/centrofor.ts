import { Router } from 'express';
import validateToken from './validate_token';
import { getCentrofor, newCenter } from '../controllers/centrofor';

const router = Router();

router.get('/',validateToken, getCentrofor);
router.post('/', newCenter);

export default router;