
import Mensaje from '../models/mensaje'
interface IPayloadGetChats{
    uid: string;
}


export const socketsController = (socket: any ) => {

    console.log(`Nueva conexion de: ${ socket.id }`);
    
    socket.on('get-chats',(payload: IPayloadGetChats) => {
        const { uid } = payload;

        console.log({usuario: uid});
        socket.emit("send-chats",{data:'aqui van los chats del usuario'})
        
    })

    socket.on('enviar-mensaje-global', async (payload: any) => {

        const newMensaje = new Mensaje({
            fecha: new Date(),
            mensaje: payload.mensaje
        })
        await newMensaje.save()

        const mensajes = await Mensaje.find();

        socket.broadcast.emit( 'actualizar-mensajes', mensajes )

    })

    socket.on('get-mensajes-global', async () => {

        const mensajes = await Mensaje.find()

        socket.emit('recibir-mensajes', mensajes )

    })

    socket.on("disconnect",() => {
        console.log("Conexion cerrada");
    })
}