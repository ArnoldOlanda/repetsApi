import mongoose, { ConnectOptions } from 'mongoose'
import yargs from 'yargs/yargs'

//Yargs config
const argv = yargs(process.argv.slice(2)).options({
    dev:{ type: 'boolean' }
}).parseSync();

export const dbConnection = async () => {
    const { dev } = argv
    const MONGO_URI= !!dev ? `${ process.env.MONGODB_DEV }` : `${ process.env.MONGODB_ATLAS }`;
    // console.log(MONGO_URI)
    try {
        
        await mongoose.connect(MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: true
        } as ConnectOptions);

        console.log('Database connected...');
        

    } catch (error) {
        console.log(error);
        throw new Error('Error al conectar la base de datos')
    }
}
