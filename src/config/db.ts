import mongoose from 'mongoose';

const connectDB = async (): Promise<typeof mongoose> => {
  
    try{
        const mongoUri = `${process.env.MONGODB_URI}/${process.env.DB_NAME}`;

        const connection = await mongoose.connect(mongoUri);

        console.log('Connected to MongoDB successfully');

        return connection;

    }
    catch(error){
        console.error('Failed to connect to MongoDB:', error);
        process.exit(1);

    }

};

export default connectDB;
