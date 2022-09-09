import express, { Application } from 'express'
import cors from 'cors'

import routerUsers from '../routes/users'
import routerAuth from '../routes/auth'
import routerPetHouses from '../routes/petHouses'
import routerCategorias from '../routes/categorias'
import { dbConnection } from '../database/config';


class Server{
    
    app: Application;
    port: string | number;
    userPaths: string;
    indexPath: string;
    authPath: string;
    petHousePath: string;
    categoriaPath: string;

    constructor(){
        this.app = express();
        this.port = process.env.PORT || 5000;
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
    }
    async conectarDB() {
        await dbConnection();
    }

    middlewares(){
        //Cors
        this.app.use( cors() )

        this.app.use( express.json() )
        
        //Public folder
        this.app.use(express.static( "public" ))
        
    }

    routes(){
        this.app.get(this.indexPath, ( _ , res )=>{  // '_' para ignorar los parametros no usados
            res.json({msg:"re-pets api - conected"})
        })
        this.app.use(this.userPaths, routerUsers)
        this.app.use(this.authPath, routerAuth)
        this.app.use(this.petHousePath, routerPetHouses)
        this.app.use(this.categoriaPath, routerCategorias)
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log(`Server on line in the port: ${ this.port }`);
        })
    }
}

export default Server;