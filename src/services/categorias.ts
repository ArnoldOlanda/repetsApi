
import { Request, Response } from "express";

import Categoria from "../models/categoria";


export const getCategoria = async (_req: Request, res: Response) => {

    try {
        const data = await Categoria.find();

        return res.json({
            data
        })
    } catch (error) {
        console.log( error );
        throw error;    
    }

}

export const postCategoria = async ( req: Request, res: Response ) => {

    try {
        
        const { nombre } = req.body;

        const categoria = new Categoria({ categoria: nombre })

        await categoria.save();

        return res.json({
            msg: "Categoria registrada",
            categoria
        })

    } catch (error) {
        
        console.log( error )

        return res.status(400).json({
            err:"Ocurrio un error al registrar la categoria, consulte con el administrador"
        })
    }

}

export const putCategoria = async ( req: Request, res: Response ) => {

    try {
        const { id } = req.params;
        const { nombre } = req.body;

        const categoria = await Categoria.findByIdAndUpdate(id,{ categoria:nombre });

    
        return res.json({
            msg: "Categoria actualizada",
            categoria
        })

    } catch (error) {
        
        console.log( error )

        return res.status(400).json({
            err:"Ocurrio un error al actualizar la categoria, consulte con el administrador"
        })
    }

}

export const activate = async ( req: Request, res: Response ) => {

    try {

        const { id } = req.params;
        const categoria = await Categoria.findByIdAndUpdate(id,{ estado: true });

        return res.json({
            msg: "Categoria activada",
            categoria
        })

    } catch (error) {
        
        console.log( error )

        return res.status(400).json({
            err:"Ocurrio un error al actualizar la categoria, consulte con el administrador"
        })
    }

}

export const deactivate = async ( req: Request, res: Response ) => {

    try {

        const { id } = req.params;
        const categoria = await Categoria.findByIdAndUpdate( id,{ estado: false });

        return res.json({
            msg: "Categoria activada",
            categoria
        })

    } catch (error) {
        
        console.log( error )

        return res.status(400).json({
            err:"Ocurrio un error al actualizar la categoria, consulte con el administrador"
        })
    }

}

