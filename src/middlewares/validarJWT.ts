import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Usuario from '../models/usuario';

interface JwtPayload{
    uid: string
}

export const validarJWT = async ( req: Request, res: Response, next:NextFunction ) =>{

    const token = req.header('access-token');

    if( !token) {
        return res.status(401).json({
            msg:'Se necesita enviar el token de auntenticacion'
        })
        
    }
    try {
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY as string ) as JwtPayload
        
        const usuario = await Usuario.buscar( Number( uid ) );
        
        //Validar que el usuario exista en la base de datos
        if ( !usuario ) {
            return res.status(401).json({
                msg:'Token no valido - usuario eliminado de la BD'
            })
        }
        
        //Validar que el estado del usuario sea TRUE
        //@ts-ignore
        if( usuario.estado == 0 ) {
            return res.status(401).json({
                msg: 'Token no valido - usuario no activo'
            })
        }
        //@ts-ignore
        req.autenthicatedUser = usuario,

        next();
        return

    } catch (error) {
        console.log( error );
        return res.status(401).json({
            msg:'Token invalido'
        })
    }
}

