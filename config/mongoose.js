require('dotenv').config();
import mongoose from 'mongoose';

let count = 0;

const options = {
    autoIndex: false,
    poolSize: 10,
    bufferMaxEntries: 0,
    useNewUrlParser: true,
    useUnifiedTopology: true
    
};

const connectWithRetry = () => {
    console.log('MongoDB connection with retry')
    mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, options)
        .then(() => {
            console.log('MongoDB is connected')
        }).catch(err=>{
            console.log('MongoDB connection unsuccessful, retry after 5 seconds. ', ++count);
            setTimeout(connectWithRetry, 5000)
    })
};

connectWithRetry();

export default mongoose