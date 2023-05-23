import { Router } from 'express';
import { deleteGroup, getGCc, getGName, getGNc, getGNid, getGrupos, getOneGroup, updateGroup } from '../controllers/grupo';
import validateToken from './validate_token';

const router = Router();

router.get('/', validateToken, getGrupos);
router.post('/filterid/:numero_idt=', getGNid);
router.get('/filternu', getGName);
router.get('/filternc', getGNc);
router.get('/filtercc', getGCc);

// crud
router.put('/:id_group', updateGroup);
router.delete('/:id_group', deleteGroup);
router.get('/:id_group', getOneGroup);

export default router;