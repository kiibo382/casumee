import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

const options = {
    autoIndex: false,
    poolSize: 10,
    bufferMaxEntries: 0,
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

export function connectWithRetry() {
    console.log("MongoDB connection with retry");
    mongoose
        .connect(
            `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
            options
        )
        .then(() => {
            console.log("MongoDB is connected");
        })
        .catch((err) => {
            console.log(
                "MongoDB connection unsuccessful, retry after 5 seconds. "
            );
            console.log(err)
            setTimeout(connectWithRetry, 5000);
        });
};
