
import { Request, Response } from "express";
import Pet from "../models/pet";
import Usuario from "../models/usuario"

export const getPets = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        const data = await Pet.find();

        return res.json({
            data
        })
    } catch (error) {
        console.log( error );
        throw error;    
    }
}
export const getUserPets = async (req: Request, res: Response) => {
    try {
        
        const { id } = req.params
        const pets = await Pet.find({ propietarioUid: id });
        
        return res.json({
            data: pets
        })

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            err: "Error al obtener la informacion, hable con el administrador"
        })
    }
}


// Registrar nuevo usuario
export const postPet = async (req: Request, res: Response) => {

    try {
        const data = req.body;
        const newPet = new Pet( data );

        const savedPet = await newPet.save();

        return res.json({
            msg: "ok - Mascota registrada",
            pet: savedPet,
        })

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            err: "Error al registrar, hable con el administrador"
        })
    }

}


export const putPet = async( req:Request, res: Response ) => {


    const { id } = req.params
    const data = req.body

    try {
        const pet = await Pet.findByIdAndUpdate(id, data);

        return res.json({
            msg: "ok - Mascota actualizada",
            pet
        })

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            err: "Error al actualizar, hable con el administrador"
        })
    }

}

export const deletePet = async (req: Request, res: Response) => {

    const { id } = req.params

    try {
        const pet = await Pet.findByIdAndUpdate(id,{ estado: false });

        if (!pet) {
            return res.status(400).json({
                err: "Error al eliminar, hable con el administrador"
            })
        }

        return res.json({
            msg: "Mascota eliminada"
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            err: "Error al eliminar, hable con el administrador"
        })
    }

}


