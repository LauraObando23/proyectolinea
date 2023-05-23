import {Request,Response} from 'express';
import bcrypt from 'bcrypt';
import { user} from '../models/user';
import jwt from 'jsonwebtoken'; 

export const newUser = async (req:Request, res:Response) => {
    
    const { name_user, email, numero_idt, tipo_usuario,password }= req.body; 

    //Validar existencia
    const useer = await user.findOne({where:{email: email}});
    const usern = await user.findOne({where:{numero_idt:numero_idt}})
    if(useer){
        return res.status(400).json({
            msg: `El usuario ${email} ya existe!`
        })
    }else if(usern){
        return res.status(400).json({
            msg: `El usuario ${numero_idt} ya existe!`
        })
    }

    const hashPassword = await bcrypt.hash(password, 10);

    try {
        
        await user.create({
            name_user: name_user,
            email: email,
            numero_idt: numero_idt,
            tipo_usuario: tipo_usuario,
            password: hashPassword
        })
        res.json({
            msg: `Usuario ${name_user} registrado exitosamente!`
        })

    } catch (error) {
        res.status(400).json({
            msg: 'Error en registro',
            error
        })
    }   

}

export const loginUser = async (req: Request, res: Response) => {
    const { email,password }= req.body; 
    //validacion de existencia
    const usser: any = await user.findOne({where:{email: email}});
    if(!usser){
        return res.status(400).json({
            msg:`No existe usuario con el correo ${email} en base de datos`
        })
    }
    //validar contraseña
    const passwordvalida = await bcrypt.compare(password, usser.password)
    if(!passwordvalida){
        return res.status(400).json({
            msg : `Contraseña incorrecta`
        })
    }
    //generar token
    const  token = jwt.sign({
        email: email
    }, process.env.secretkey || 'dft123');
    res.json(token);
}
export const getUsers = async (req: Request, res: Response) => {
    const listUsers= await user.findAll();
    res.json(listUsers)
}

//actualizacion y eliminacion
export const updateUsers = async (req: Request, res: Response) => {
    //res.json('Actualizando ' + req.params.numero_idt)
    const { name_user, email, tipo_usuario,password }= req.body;
    const numero_idt = req.params.numero_idt;
    const hashPassword = await bcrypt.hash(password, 10);

    const listUpdate = await user.update({
            name_user: name_user,
            email: email,
            numero_idt: numero_idt,
            tipo_usuario: tipo_usuario,
            password: hashPassword
    },{
        where: {
            numero_idt: numero_idt
        }
    })
    res.json(listUpdate)
}
export const deleteUsers = async (req: Request, res: Response) => {
    //res.json('Eliminando '+ req.params.numero_idt)
    const numero_idt = req.params.numero_idt; 
    const deleteUser = await user.destroy({
        where:{
            numero_idt: numero_idt
        }
    });
    res.status(204).json(deleteUser)
}
export const getOneUsers = async(req: Request, res: Response) => {
    //res.json('Seleccionado '+ req.params.numero_idt)
    const numero_idt = req.params.numero_idt; 
    const listUser = await user.findOne({where: {numero_idt: numero_idt}});
    if(listUser){
        res.json(listUser)
    }else{
        res.status(404).json({
            msg : `No existe el usuario ${numero_idt}`
        })
    } 
}
export const getOneUserN = async(req: Request, res: Response) => {
    //res.json('Seleccionado '+ req.params.numero_idt)
    const name_user = req.params.numero_idt; 
    const listUser = await user.findOne({where: {name_user: name_user}});
    if(listUser){
        res.json(listUser)
    }else{
        res.status(404).json({
            msg : `No existe el usuario ${name_user}`
        })
    } 
}
export const forgotPassword = async(req: Request, res:Response) => {
    const {name_user} = req.body;
    if(!name_user){
        res.status(400).json({
            msg : `Se requiere el usuario`
        })
    }
    const mss = ''
}