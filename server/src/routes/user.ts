import { Router } from 'express';
import { deleteUsers, getOneUserN, getOneUsers, getUsers, loginUser, newUser, updateUsers } from '../controllers/user';
import validateToken from './validate_token';

const router = Router();

router.get('/', validateToken, getUsers);
router.post('/', newUser);
router.post('/login', loginUser);
//nuevos
router.put('/:numero_idt', updateUsers);
router.delete('/:numero_idt', deleteUsers);
router.get('/:numero_idt', getOneUsers);
router.get('/:name_user', getOneUserN);

export default router;