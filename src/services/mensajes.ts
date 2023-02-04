import { Request, Response } from "express";
import Chat from "../models/chat";
import Mensaje from "../models/mensaje";

export const getMensajes = async (req: Request, res: Response) => {
    const { emisor, receptor } = req.params; //Chat ID
    
    try {
        const chat = await Chat.findOne({
            $and: [
                { miembros: { $in: [emisor] } },
                { miembros: { $in: [receptor] } }
            ]
        })
        if (chat) {
            const mensajes = await Mensaje.find({ chat_id: chat.id });
            return res.json(mensajes)
        }
        return res.json([]);

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            err: "Ocurrio un error hable con el administrador"
        })
    }
}

export const getChats = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const chats = await Chat.find({ miembros: { $in: id } })
            .populate({
                path:"miembros",
                select:"nombre apellido img",
                populate:{
                    path:"pethouse",
                    select:"nombre galeria"
                }
            })
            .populate("ultimo_mensaje", "fecha mensaje emisor");
        return res.json(chats)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            err: "Ocurrio un error hable con el administrador"
        })
    }
}