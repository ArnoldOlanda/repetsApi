
import { Request, Response } from "express";

import PetHouse from "../models/petHouse";

// Lista de pethouses
export const getPetHouse = async (_req: Request, res: Response) => {

    try {
        const data = await PetHouse.find().populate('categorias',{ categoria: 1});

        return res.json({
            data
        })
    } catch (error) {
        console.log( error );
        throw error;    
    }

}
// Registrar nueva pethouse
export const postPetHouse = async (req: Request, res: Response) => {

    try {
        const { ...data } = req.body;
        
        const petHouse = new PetHouse( data );

        await petHouse.save();

        return res.json({
            msg: "PetHouse registrada",
            petHouse,
        })

    } catch (error) {
        //console.log(error);
        
        return res.status(400).json({
            err: "Error al registrar, hable con el administrador"
        })
    }

}

export const putPetHouse = async ( req: Request, res: Response ) => {
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
        
        await PetHouse.findByIdAndUpdate(id,{ estado:false });

        return res.json({
            msg: "PetHouse eliminada"
        })
    } catch (error) {
        return res.status(400).json({
            err: "Error al eliminar, hable con el administrador"
        })
    }

}


