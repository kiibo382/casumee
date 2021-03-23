import { dbConfig } from "./db.config"
import mongoose from "mongoose";

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
            `mongodb://${dbConfig.DB_USER}:${dbConfig.DB_PASS}@${dbConfig.HOST}:${dbConfig.DB_PORT}/${dbConfig.DB_NAME}`,
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
