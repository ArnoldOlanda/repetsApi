import express, { Application } from 'express';
import server from 'http';
import io, { Socket } from 'socket.io';
import morgan from 'morgan';
import cors from 'cors';
import { v2 as cloudinary } from 'cloudinary';
import fileUpload from 'express-fileupload';
import Stripe from 'stripe';
import { AppDataSource } from '../database/data-source';
import { socketsController } from '../sockets/socketsController';
import { JwtStrategy } from '../helpers/auth/strategies/jwt.strategy';

import routerSeed from '../Seed/seed.routes';
import { UserRoutes } from '../User/user.routes';
import { PREFIX, paths } from '../config';

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
  cloudinary: any;
  stripe: any;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 5000;
    this.server = server.createServer(this.app);
    this.io = new io.Server<
      ServerToClientEvents,
      ClientToServerEvents,
      InterServerEvents,
      SocketData
    >(this.server);

    //Cloudinary config
    this.cloudinary = cloudinary.config({
      cloud_name: `${process.env.CLOUDINARY_NAME}`,
      api_key: `${process.env.CLOUDINARY_API_KEY}`,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    //Stripe config
    this.stripe = new Stripe(
      'sk_test_51MR2e5DGlfAnj7PF1H5xf59VWQJXJT9JPyl7r3ISyYm6XqVzkAyu1HybfCgiH8aP4kAFnCqAKk0dvngAbUko2a4900A5GcmtEA',
      {
        apiVersion: '2022-11-15',
      }
    );

    //Conectar a base de datos
    this.conectarDB();

    //Middlewares
    this.middlewares();

    //Routes
    this.routes();

    //Sockets
    this.sockets();

    //Auth strategy
    this.authStrategy();
  }
  async conectarDB() {
    try {
      //await dbConnection(); //MongoDB
      await AppDataSource.initialize(); //Postgres
      console.log('Postgres database connected!');
    } catch (error) {
      console.log(error);
    }
  }

  middlewares() {
    //Cors
    this.app.use(cors());

    this.app.use(express.json());

    //Public folder
    this.app.use(express.static('public'));

    this.app.use(morgan('short'));

    //Carga de archivos - imagenes
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: '/tmp/',
      })
    );
  }

  authStrategy() {
    new JwtStrategy();
  }

  routes() {
    this.app.get(PREFIX, (_, res) => {
      res.json({ msg: 're-pets api - conected' });
    });

    this.app.post(`${PREFIX}/payment-intent`, async (req, res) => {
      try {
        console.log(req.body);
        const { amount, currency } = req.body;

        const paymentIntent = await this.stripe.paymentIntents.create({
          amount,
          currency,
        });

        res.json({
          ok: true,
          clientSecret: paymentIntent.client_secret,
        });
      } catch (error) {
        console.log(error);
        res.json({
          ok: 'false',
          msg: error,
        });
      }
    });
    //--------------------------------------------
    this.app.use(`${paths.USER}`, new UserRoutes().routes);
    this.app.use(`${paths.SEED}`, routerSeed);
  }

  sockets() {
    this.io.on('connection', socketsController);
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(`Server on line in the port: ${this.port}`);
    });
  }
}

export default Server;
