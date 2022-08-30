
import { Request, Response } from "express";
import bcryptjs from 'bcryptjs'
import Usuario from '../models/usuario';


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
export const postUser = async (_req: Request, res: Response) => {

    try {
        // const { nombre, usuario, password, direccion } = req.body

        const salt = bcryptjs.genSaltSync()
        // const password_ = bcryptjs.hashSync( password, salt )
        console.log(salt);

        await Usuario.registrar()

        return res.json({
            msg: "Usuario registrado"
        })

    } catch (error) {
        return res.status(400).json({
            err: "Ocurrio un error al intentar registrar al usuario hable con el administrador"
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


