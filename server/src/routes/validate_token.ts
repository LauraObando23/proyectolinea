import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

const validateToken = (req: Request, res: Response, next: NextFunction) =>{
    const headerToken = req.headers['authorization']

if(headerToken != undefined && headerToken.startsWith('Bearer ')){
    //validar token
    try{
        const bearertk = headerToken.slice(7);
        jwt.verify(bearertk, process.env.secretkey || 'dft123');
        next()
    }catch(error){
        res.status(401).json({
            msg: `Token invalido`
        })
    }
}else{
    res.status(401).json({
        msg : `Acceso denegado`
    })
}
}

export default validateToken;