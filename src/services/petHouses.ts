
import e, { Request, Response } from "express";
import fileUpload, { FileArray, UploadedFile } from "express-fileupload";
import { v2 as cloudinary } from 'cloudinary'

import PetHouse from "../models/petHouse";
import Usuario from "../models/usuario";

// Lista de pethouses
export const getPetHouse = async (_req: Request, res: Response) => {

    try {
        const data = await PetHouse.find()
            .populate('tipo_mascotas', { categoria: 1 })
            .populate('propietario',{ nombre: 1, apellido: 1 });

        return res.json({
            data
        })
    } catch (error) {
        console.log(error);
        throw error;
    }

}

export const getPetHouseOne = async (req: Request, res: Response) => {
    const { uid } = req.params

    try {
        const pethouse = await PetHouse.findById(uid)
            .populate('tipo_mascotas', { categoria: 1 })
            .populate('propietario',{ nombre: 1, apellido: 1 })
            .populate('pethouse',{ nombre: 1 });

        return res.json({
            pethouse
        })
    } catch (error) {
        console.log(error);
        throw error;
    }

}

// Registrar nueva pethouse
export const postPetHouse = async (req: Request, res: Response) => {

    try {
        const { ...data } = req.body;

        const pethouse = new PetHouse(data);

        const savedPethouse = await pethouse.save();

        const user = await Usuario.findById( savedPethouse.propietario );

        if(user){
            user.pethouse = savedPethouse.id
            await user.save()
        }

        return res.json({
            msg: "PetHouse registrada",
            pethouse,
        })

    } catch (error) {
        console.log(error);

        return res.status(400).json({
            err: "Error al registrar, hable con el administrador"
        })
    }

}

export const updateGalleryPetHouse = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            res.status(400).json({ msg: 'No hay imagen para subir.' });
            return;
        }

        const pethouse = await PetHouse.findById(id);

        if (pethouse) {

            //TODO: eliminar las fotos de la pethouse antiguas

            const image1 = req.files.image1 as UploadedFile;
            const image2 = req.files.image2 as UploadedFile;
            const image3 = req.files.image3 as UploadedFile;
            
            const paths: string[] = []
            const secure_urls:string[] = []

            image1 && paths.push(image1.tempFilePath)
            image2 && paths.push(image2.tempFilePath)
            image3 && paths.push(image3.tempFilePath)
        
            
            const response = await Promise.all(
                paths.map( async e =>(
                    await cloudinary.uploader.upload(e,{folder: 'repets-app/pethouses'})
                ))
            )
            
            for (const element of response) {
                secure_urls.push(element.secure_url)
            }

            pethouse.galeria = pethouse.galeria.concat(secure_urls)

            const updatedPethouse = await pethouse.save();

            return res.json({
                pethouse: updatedPethouse
            })
        }

        return res.status(400).json({
            err:'No existe la pethouse'
        })

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            err: 'Ocurrio un error'
        })
    }
}

export const putPetHouse = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const data = req.body
        const petHouse = await PetHouse.findByIdAndUpdate(id, data)

        return res.json({
            msg: "PetHouse actualizada",
            petHouse,
        })

    } catch (error) {

        console.log(error);
        return res.status(400).json({
            err: "Error al actualizar, hable con el administrador"
        })
    }
}

export const deletePetHouse = async (req: Request, res: Response) => {
    const { id } = req.params

    try {

        await PetHouse.findByIdAndUpdate(id, { estado: false });

        return res.json({
            msg: "PetHouse eliminada"
        })
    } catch (error) {
        return res.status(400).json({
            err: "Error al eliminar, hable con el administrador"
        })
    }

}


