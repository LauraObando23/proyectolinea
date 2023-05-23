import {Request, Response} from 'express';
import { grupo } from '../models/grupo';
import { QueryTypes } from 'sequelize';
import sequelize from '../db/connection';
export const getGrupos = async (req: Request, res: Response) => {
        //const listGrupo = await grupo.findAll();
        const listGrupo= await sequelize.query("SELECT g.id_group, g.group, s.name_user, c.name FROM grupos AS g INNER JOIN users AS s ON g.userIdUser=s.id_user INNER JOIN cursos AS c ON g.cursoId=c.id;", { type: QueryTypes.SELECT });
        res.json(listGrupo)
}
//actualizacion y eliminacion
export const updateGroup = async (req: Request, res: Response) => {
    //res.json('Actualizando ' + req.params.numero_idt)
    const { id_group, group, cursoId, userIdUser }= req.body;

    const listGrupo = await grupo.update({
            group: group,
            cursoId: cursoId,
            userIdUser: userIdUser
    },{
        where: {
            id_group: id_group
        }
    })
    res.json(listGrupo)
}
export const deleteGroup = async (req: Request, res: Response) => {
    
    const id_group = req.params.id_group; 
    const deleteGroup = await grupo.destroy({
        where:{
            id_group: id_group
        }
    });
    res.status(204).json(deleteGroup)
}
export const getOneGroup = async(req: Request, res: Response) => {
    //res.json('Seleccionado '+ req.params.numero_idt)
    const id_group = req.params.id_group; 
    const listGrupo = await grupo.findOne({where: {id_group: id_group}});
    if(listGrupo){
        res.json(listGrupo)
    }else{
        res.status(404).json({
            msg : `No existe el usuario ${id_group}`
        })
    } 
}

export const getGNid = async (req: Request, res: Response) => {
    const { numero_idt }= req.body; 
    //validacion de existencia
    const group: any = await grupo.findOne({where:{numero_idt: numero_idt}});
    if(group){
        const users = await sequelize.query("SELECT g.group, s.name_user, c.name FROM grupos AS g INNER JOIN users AS s ON g.userIdUser=s.id_user INNER JOIN cursos AS c ON g.cursoId=c.id WHERE s.numero_idt=?", { type: QueryTypes.SELECT });
        res.json(users) 
    }
}
export const getGName = async (req: Request, res: Response) => {
    const users = await sequelize.query("SELECT g.group, s.name_user, c.name FROM grupos AS g INNER JOIN users AS s ON g.userIdUser=s.id_user INNER JOIN cursos AS c ON g.cursoId=c.id WHERE s.name_user='Maria Fernandez'", { type: QueryTypes.SELECT });
    res.json(users)
}
export const getGNc = async (req: Request, res: Response) => {
    const users = await sequelize.query("SELECT g.group, s.name_user, c.name FROM grupos AS g INNER JOIN users AS s ON g.userIdUser=s.id_user INNER JOIN cursos AS c ON g.cursoId=c.id WHERE c.name='Matematicas'", { type: QueryTypes.SELECT });
    res.json(users)
}
export const getGCc = async (req: Request, res: Response) => {
    const users = await sequelize.query("SELECT g.group, s.name_user, c.name FROM grupos AS g INNER JOIN users AS s ON g.userIdUser=s.id_user INNER JOIN cursos AS c ON g.cursoId=c.id WHERE c.code='2397381'", { type: QueryTypes.SELECT });
    res.json(users)
}
