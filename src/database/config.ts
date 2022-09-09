import mongoose, { ConnectOptions } from 'mongoose'

export const dbConnection = async () => {
    try {
        
        await mongoose.connect(`${ process.env.MONGODB_ATLAS }`,{
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
