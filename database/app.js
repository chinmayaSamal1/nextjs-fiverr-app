import mongoose from 'mongoose';

const mongodbConnect = async () => {
    try {
        mongoose
            .connect(
                process.env.MONGO_LINK
            )
            .then(console.log('Database connected'));
    } catch (error) {
        Promise.reject(error);
    }
};

export default mongodbConnect;
 