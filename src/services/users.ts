
import { Request, Response } from "express";
import bcryptjs from 'bcryptjs'
import { v2 as cloudinary} from 'cloudinary'

import { UsuarioDef } from "../types";
import { generateVerifyCode } from "../helpers/generateVerifyCode";
import { sendMail } from "../helpers/sendMail";
import Usuario from "../models/usuario";
import { generarJWT } from "../helpers/generarJWT";
import { uploadFiles } from "../helpers";
import fileUpload from "express-fileupload";




// cloudinary.config({
//     cloud_name:process.env.CLOUDINARY_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret:process.env.LOUDINARY_API_SECRET,
// });


//cloudinary.config('cloudinary://481341799119962:lzC93GPjH1M_5ICS2XCgf4OR06s@dvoo0vvff')

export const getUser = async (_req: Request, res: Response) => {
    const data = _req

    try {
        const data = await Usuario.find();

        return res.json({
            data
        })
    } catch (error) {
        console.log(error);
        throw error;
    }

}

// Registrar nuevo usuario
export const postUser = async (req: Request, res: Response) => {

    try {
        let { password, ...resto } = req.body as UsuarioDef;


        const salt = bcryptjs.genSaltSync();

        password = bcryptjs.hashSync(password, salt);

        const usuario = new Usuario({ ...resto, password });

        await usuario.save();

        const verifyCode = generateVerifyCode()

        const { correo } = resto;

        //Enviar correo con codigo de verificacion
        sendMail(correo, verifyCode)

        return res.json({
            msg: "ok - Usuario registrado",
            usuario,
            verifyCode
        })

    } catch (error) {
        return res.status(400).json({
            err: "Error al registrar, hable con el administrador"
        })
    }

}

export const patchVerifyNewUser = async (req: Request, res: Response) => {
    try {
        const { id, generateCode, givenCode } = req.body
        console.log(id);

        if (generateCode !== givenCode) {
            return res.status(400).json({
                err: "Codigo de verificacion incorrecto"
            })
        } else {
            const usuario = await Usuario.findByIdAndUpdate(id, { estado: true }, { new: true });

            const token = await generarJWT(id);

            return res.json({
                msg: 'ok - Cuenta activada',
                usuario,
                token
            })
        }

    } catch (error) {

        console.log(error);

        return res.status(400).json({
            err: "Error al activar la cuenta, hable con el administrador"
        })
    }
}

export const putUser = async (req: Request, res: Response) => {


    const { id } = req.params
    const data = req.body

    try {
        const user = await Usuario.findByIdAndUpdate(id, data);

        return res.json({
            msg: "ok - Usuario actualizado",
            usuario: user
        })

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            err: "Error al actualizar, hable con el administrador"
        })
    }

}

export const updatePhotoUser = async (req: Request, res: Response) => {

    const { id } = req.params

    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            res.status(400).json({ msg: 'No hay imagen para subir.' });
            return;
        }

        if (!req.files.image || Object.keys(req.files).length === 0) {
            res.status(400).json({ msg: 'No hay imagen para subir.' });
            return;
        }

        const user = await Usuario.findById( id );

        //const nombre = await uploadFiles( req ); sube el archivo de forma local al servidor
        const image = req.files.image as fileUpload.UploadedFile;

        const { secure_url } = await cloudinary.uploader.upload(image.tempFilePath,{folder:'repets-app/usuarios'})

        if(user){
            user.img = secure_url
            await user.save();
        }

        return res.json({
            user
        })
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            err:'Ocurrio un error'
        })
    }

}

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        const user = await Usuario.findByIdAndUpdate(id, { estado: false });

        if (!user) {
            return res.status(400).json({
                err: "Error al eliminar, hable con el administrador"
            })
        }

        return res.json({
            msg: "Usuario eliminado"
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            err: "Error al eliminar, hable con el administrador"
        })
    }

}


