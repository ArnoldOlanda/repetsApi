//@ts-check
// const bcryptjs = require('bcryptjs');
// const { generarJWT } = require('../helpers/generarJWT');
// const Usuario = require('../models/usuario');
// const { query } = require('../database/config')

import { Request, Response } from "express";
import bcryptjs from 'bcryptjs'
import { query } from "../database/config";
import { generarJWT } from '../helpers/generarJWT'
import { RowDataPacket } from "mysql2";


export const login = async (req: Request,res: Response )  =>{
    
    const { usuario, password } = req.body;

    try {

        //Verificar si el email existe
        const usuarioDb = await query(`select * from usuario where email = "${ usuario }"`) as RowDataPacket;
        console.log(usuarioDb);
        
        
        if(!usuarioDb[0]) return res.status(400).json({
             msg:'El usuario no existe'
        })

        //Si el usuario esta activo
        // if (!usuarioDb[0].estado) return res.status(400).json({
        //     msg:'Este usuario no se encuentra registrado en la base de datos'
        // })
        
        //Verificar el password
        const validaPassword = bcryptjs.compareSync( password,usuarioDb[0].password );

        if(!validaPassword) return res.status(400).json({
             msg:'El password proporcionado para el usuario es incorrecto'
        })
        // Generar el jwt
        const token = await generarJWT( usuarioDb[0].id )


        return res.json({
            usuario:usuarioDb[0],
            token
        })
    } catch (error) {
        console.log( error );
        return res.status(500).json({
            msg: 'Ha ocurrido un error hable con el administrador'
        })
    }

}

// const googleSignIn = async (req, res=response ) =>{
//     const { id_token } = req.body

//     try {

//         const { name,email,picture } = await googleVerify( id_token );

//         let usuario = await Usuario.findOne({ correo:email })

//         if(!usuario){
//             const data = {
//                 nombre:name,
//                 correo:email,
//                 password:':v',
//                 img:picture,
//                 google:true,
//                 rol:'USER_ROLE'
//             }
//             usuario = new Usuario(data)
//             console.log(usuario);
//             await usuario.save();
//         }

//         if(!usuario.estado){
//             return res.status(401).json({
//                 msg:'Usuario no activo'
//             })
//         }

//         // Generar el jwt
//         const token = await generarJWT( usuario.id )

//         res.json({
//             usuario,
//             token
//         })
//     } catch (error) {
//         console.log(error);
//         res.status(400).json({
//             ok:'false',
//             msg:'No se pudo verificar el token'
//         })
//     }

// } 
