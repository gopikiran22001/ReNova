import mongoose from 'mongoose';

const connectDB = async () => {
    return await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/renova');
};

export default connectDB;
