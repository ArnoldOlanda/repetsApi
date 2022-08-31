
import { Request, Response } from "express";
import bcryptjs from 'bcryptjs'
import Usuario from '../models/usuario';
import { UsuarioDef } from "../types";
import { generateVerifyCode } from "../helpers/generateVerifyCode";


export const getUser = async (_req: Request, res: Response) => {
    //const { limite = 5, desde = 0 } = req.query;
    try {
        const data = await Usuario.listar();

        return res.json({
            data
        })
    } catch (error) {
        return
    }

}
// Registrar nuevo usuario
export const postUser = async (req: Request, res: Response) => {

    try {
        let { password, ...resto } = req.body as UsuarioDef;

        const salt = bcryptjs.genSaltSync();

        password = bcryptjs.hashSync( password, salt );

        await Usuario.registrar({ password,...resto });

        const verifyCode = generateVerifyCode()

        //TODO: crear helper para envio de correo con el codigo de verificacion

        return res.json({
            msg: "Usuario registrado",
            verifyCode
        })

    } catch (error) {
        return res.status(400).json({
            err: "Ocurrio un error al intentar registrar al usuario hable con el administrador"
        })
    }

}

export const patchVerifyNewUser = async( req:Request, res: Response ) =>{
    try {
        const { id, generateCode, givenCode } = req.body
        if(generateCode !== givenCode ) {
            return res.status(400).json({
                err: "codigo de verificacion incorrecto"
            })
        }else{
            const rows = await Usuario.verificarCuenta({ id, verified: true })
            console.log(rows);
            return res.json({
                msg: 'cuenta activada'
            })
        }
        
    } catch (error) {
        return res.status(400).json({
            err: "Ocurrio un error al intentar activar la cuenta de usuario hable con el administrador"
        })
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        const user = await Usuario.eliminar(id)
        if (!user) {
            return res.status(400).json({
                err: "Ocurrio un error al intentar eliminar al usuario hable con el administrador"
            })
        }

        return res.json({
            msg: "Usuario eliminado"
        })
    } catch (error) {
        return res.status(400).json({
            err: "Ocurrio un error al intentar eliminar al usuario hable con el administrador"
        })
    }

}


