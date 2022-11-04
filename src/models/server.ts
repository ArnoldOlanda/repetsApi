import express, { Application } from 'express'
import server from 'http'
import io, { Socket } from 'socket.io'
import morgan from 'morgan'
import cors from 'cors'
import { v2 as cloudinary} from 'cloudinary'
import fileUpload from 'express-fileupload'

import routerUsers from '../routes/users'
import routerAuth from '../routes/auth'
import routerPetHouses from '../routes/petHouses'
import routerCategorias from '../routes/categorias'
import routerPets from '../routes/pets'

import { dbConnection } from '../database/config';
import { socketsController } from '../sockets/socketsController'

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
    petsPath: string;
    cloudinary: any;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 5000;
        this.server = server.createServer(this.app);
        this.io = new io.Server<ServerToClientEvents,ClientToServerEvents,InterServerEvents,SocketData>(this.server)

        this.indexPath = '/api';
        this.userPaths = '/api/usuarios';
        this.authPath = '/api/auth';
        this.petHousePath = '/api/pethouses';
        this.categoriaPath = '/api/categorias';
        this.petsPath = '/api/pets';
        // this.cloudinary = cloudinary.config('cloudinary://481341799119962:lzC93GPjH1M_5ICS2XCgf4OR06s@dvoo0vvff')
        this.cloudinary = cloudinary.config({
            cloud_name:`${process.env.CLOUDINARY_NAME}`,
            api_key: `${process.env.CLOUDINARY_API_KEY}`,
            api_secret:process.env.CLOUDINARY_API_SECRET,
        });

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

        this.app.use(morgan('short'))

        //Carga de archivos - imagenes
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/'
        }));

    }

    routes() {
        this.app.get(this.indexPath, (_, res) => {  // '_' para ignorar los parametros no usados
            res.json({ msg: "re-pets api - conected" })
        })
        this.app.use(this.userPaths, routerUsers)
        this.app.use(this.authPath, routerAuth)
        this.app.use(this.petHousePath, routerPetHouses)
        this.app.use(this.categoriaPath, routerCategorias)
        this.app.use(this.petsPath, routerPets)
    }

    sockets() {
        this.io.on("connection",socketsController)
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log(`Server on line in the port: ${this.port}`);
        })
    }
}

export default Server;