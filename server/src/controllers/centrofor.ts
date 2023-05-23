import {Request, Response} from 'express';
import { centrofor } from '../models/centrofor';
export const getCentrofor = async (req: Request, res: Response) => {
    const listCentro = await centrofor.findAll();
    res.json(listCentro)
}

export const newCenter = async (req:Request, res:Response) => {
    
    const { centro, direccion, sede, numero_comunicacion }= req.body; 

    //Validar existencia
    const ceenter = await centrofor.findOne({where:{centro: centro}});
    const centerd = await centrofor.findOne({where:{direccion:direccion}})
    if(ceenter){
        return res.status(400).json({
            msg: `El usuario ${centro} ya existe!`
        })
    }else if(centerd){
        return res.status(400).json({
            msg: `El usuario ${direccion} ya existe!`
        })
    }

    try {
        
        await centrofor.create({
            centro: centro,
            direccion: direccion,
            sede: sede,
            numero_comunicacion: numero_comunicacion
        })
        res.json({
            msg: `Centro de formación ${centro} registrado exitosamente!`
        })

    } catch (error) {
        res.status(400).json({
            msg: 'Error en registro',
            error
        })
    }   

}