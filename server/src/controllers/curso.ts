import {Request, Response} from 'express';
import { curso } from '../models/curso';
export const getCursos = async (req: Request, res: Response) => {
    const listCurso = await curso.findAll();
    res.json(listCurso)
}