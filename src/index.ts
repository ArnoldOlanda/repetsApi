import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();

import Server from './models/server';
import * as admin from 'firebase-admin';
import serviceAccount from '../tmfase2-firebase-adminsdk-dkulv-9d21d9c651.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

const server = new Server();

server.listen();
