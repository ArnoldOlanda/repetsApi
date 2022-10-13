
export const socketsController = (socket: any ) => {

    console.log(`Nueva conexion de: ${ socket.id }`);
    
    socket.emit("obtener-chats",{data:'chats'})

    socket.on("hello",(payload: any)=>{
        console.log("saludo", payload);
        socket.emit('devolver-saludo',{ respuesta: 'que tal' })
    })

    socket.on("disconnect",() => {
        console.log("Conexion cerrada");
    })
}