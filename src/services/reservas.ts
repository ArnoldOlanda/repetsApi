import { Request, Response } from "express";
import Reserva from "../models/reserva";


export const listadoReservas = async (_req: Request, res: Response) => {
    try {
        const reservas = await Reserva.find()

        return res.json({
            data: reservas
        })     

    } catch (error) {
        console.log(error)

        return res.status(400).json({
            err:"Ocurrion un error"
        })
    }
}

export const obtenerReserva = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const reserva = await Reserva.findById(id)
            .populate('usuario',{ nombre: 1, apellido: 1 })
            .populate('pethouse',{ nombre: 1 })

        return res.json({
            data: reserva
        })     

    } catch (error) {
        console.log(error)

        return res.status(400).json({
            err:"Ocurrion un error"
        })
    }
}

export const registrarReserva = async (req: Request, res: Response) => {

    const { body } = req
    try {
        const newReserva = new Reserva(body)
        const savedReserva = await newReserva.save()
        
        return res.json({
            data: savedReserva
        })
        
    } catch (error) {
        console.log(error);
        
        return res.status(400).json({
            err:"Ocurrion un error"
        })
    }

}

export const actualizarEstadoReserva = async (req:Request, res:Response) => {

    try {
        const { id } = req.params
        const { estado } = req.body

        const reserva = await Reserva.findByIdAndUpdate(id,{ estado })

        if(reserva) {
            const saved = await reserva.save()
            
            return res.json({
                data: saved
            })
        }
        return res.json({
            msg: "No se encontro la reserva"
        })

    } catch (error) {
        console.log(error);
        
        return res.status(400).json({
            err:"Ocurrion un error"
        })
    }

}