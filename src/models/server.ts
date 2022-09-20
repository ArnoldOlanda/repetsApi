import express, { Application } from 'express'
import server from 'http'
import io from 'socket.io'
import cors from 'cors'

import routerUsers from '../routes/users'
import routerAuth from '../routes/auth'
import routerPetHouses from '../routes/petHouses'
import routerCategorias from '../routes/categorias'

import { dbConnection } from '../database/config';

interface ServerToClientEvents {
    noArg: () => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
}

interface ClientToServerEvents {
    hello: () => void;
}

interface InterServerEvents {
    ping: () => void;
}
interface SocketData {
    name: string;
    age: number;
}


class Server {

    app: Application;
    server: server.Server;
    io: any;
    port: string | number;
    userPaths: string;
    indexPath: string;
    authPath: string;
    petHousePath: string;
    categoriaPath: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 5000;
        this.server = server.createServer(this.app);
        this.io = new io.Server<ServerToClientEvents,ClientToServerEvents,InterServerEvents,SocketData>(this.server)

        this.indexPath = '/api';
        this.userPaths = '/api/usuarios';
        this.authPath = '/api/auth';
        this.petHousePath = '/api/petHouses';
        this.categoriaPath = '/api/categorias';

        //Conectar a base de datos
        this.conectarDB()

        //Middlewares
        this.middlewares();

        //Routes
        this.routes();

        //Sockets
        this.sockets();
    }
    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        //Cors
        this.app.use(cors())

        this.app.use(express.json())

        //Public folder
        this.app.use(express.static("public"))

    }

    routes() {
        this.app.get(this.indexPath, (_, res) => {  // '_' para ignorar los parametros no usados
            res.json({ msg: "re-pets api - conected" })
        })
        this.app.use(this.userPaths, routerUsers)
        this.app.use(this.authPath, routerAuth)
        this.app.use(this.petHousePath, routerPetHouses)
        this.app.use(this.categoriaPath, routerCategorias)
    }

    sockets() {
        this.io.on("connection",(socket: any ) => {
            console.log(`Nueva conexion de: ${ socket.id }`);
            

            socket.on("hello",(payload: any)=>{
                console.log("saludo", payload);
                socket.emit('devolver-saludo',{ respuesta: 'que tal' })
            })

            socket.on("disconnect",() => {
                console.log("Conexion cerrada");
            })
        })
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log(`Server on line in the port: ${this.port}`);
        })
    }
}

export default Server;