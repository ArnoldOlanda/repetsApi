
import { Request, Response } from "express";
import bcryptjs from 'bcryptjs'
import { generarJWT } from '../helpers/generarJWT'
import Usuario from '../models/usuario'
import { googleVerify } from "../helpers/googleVerify";



export const login = async ( req: Request, res: Response )  =>{
    
    const { usuario, password } = req.body;

    try {

        //Verificar si el email existe
        const usuarioDb = await Usuario.findOne({ correo: usuario })  

        if( !usuarioDb ) return res.status(400).json({
              msg:'Este usuario no existe'
        })

        //Si el usuario esta activo
        if (usuarioDb.estado === false) return res.status(400).json({
            msg:'Este usuario no se encuentra registrado '
        })
        
        //Verificar el password
        const validaPassword = bcryptjs.compareSync( password, usuarioDb.password );

        if(!validaPassword) return res.status(400).json({
              msg:'Password incorrecto'
        })
        // Generar el jwt
        const token = await generarJWT(usuarioDb.id)

        return res.json({
            usuario: usuarioDb,
            token
        })
    } catch (error) {
        console.log( error );
        return res.status(500).json({
            msg: 'Ha ocurrido un error, hable con el administrador'
        })
    }

}

export const googleSignIn = async (req: Request, res: Response ) =>{
    const { id_token } = req.body

    try {

        const { given_name,email,picture, family_name } = await googleVerify( id_token );
        
        let usuario = await Usuario.findOne({ correo:email })

        if(!usuario){
            const data = {
                nombre: given_name,
                apellido: family_name,
                correo:email,
                password:':v',
                img:picture,
                google:true,
                estado:true,
                rol:'USER_ROLE'
            }
            usuario = new Usuario(data);

            await usuario.save();
        }

        if(!usuario.estado){
            return res.status(401).json({
                msg:'Usuario bloqueado, hable con el administrador'
            })
        }

        // Generar el jwt
        const token = await generarJWT( usuario.id )

        return res.json({
            usuario,
            token
        })
    } catch (error) {

        console.log(error);

        return res.status(400).json({
            ok:'false',
            err:'No se pudo verificar el token'
        })
    }

} 
