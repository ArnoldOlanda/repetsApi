import { json, Request, Response } from "express";
import * as admin from 'firebase-admin';

import Reserva from "../models/reserva";
import Pethouse from "../models/petHouse";
import Usuario from "../models/usuario";


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
    const { pethouse } = body
    try {
        const usuarioPethouse = await Pethouse.findById(pethouse)
        const propietario = await Usuario.findById(usuarioPethouse?.propietario)

        const newReserva = new Reserva(body)
        const savedReserva = await newReserva.save()
        
        if(propietario){
            const message = {
                    
                notification: {
                    body: "Tienes una nueva solicitud de reserva",
                    title: "Nueva reserva",
                },
                data: { savedReserva: JSON.stringify(savedReserva), proyecto: "Repets App" },
                apns: {
                    payload: { aps: { 'mutable-content': 1 } },
                    fcm_options: { image: 'image-url' },
                },
                android: { notification: { image: 'image-url' } },
                token: propietario.notification_token
            };
    
            await admin.messaging()
                //@ts-ignore
                .send(message)
                .then(_response => {
                    console.log("Notificacion enviada");
                })
                .catch(console.log)
        }

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