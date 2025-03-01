import mongoose from 'mongoose';

export const startDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`🚀 MongoDB connected successfully `)
    }
    catch(err) {
        console.log(err);
        process.exit(1)
    }
}