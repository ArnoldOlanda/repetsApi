import mongoose, { ConnectOptions } from 'mongoose';

const env = process.env.NODE_ENV || 'development';

export const dbConnection = async () => {
  const MONGO_URI =
    env === 'development'
      ? `${process.env.MONGODB_DEV}`
      : `${process.env.MONGODB_ATLAS}`;
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: true,
    } as ConnectOptions);

    console.log('Database connected...');
  } catch (error) {
    console.log(error);
    throw new Error('Error al conectar la base de datos');
  }
};
