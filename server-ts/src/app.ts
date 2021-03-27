import Express from 'express'
import path from 'path'
import router from './routes/index'
import layouts from 'express-ejs-layouts'
import cookieParser from "cookie-parser";
import redis from "redis";
import session from "express-session";
import connectRedis from "connect-redis";
import cors from 'cors'
import { connectWithRetry } from "./config/mongoose"
import log4js from 'log4js';

let logger = log4js.getLogger();
logger.level = 'debug';
logger.debug("My Debug message");

declare module 'express-session' {
  interface SessionData {
    token: null | string;
  }
}

const RedisStore = connectRedis(session);
const redisClient = redis.createClient();

connectWithRetry()

const app = Express()

app.use(log4js.connectLogger(logger, { level: process.env.LOG_LEVEL || 'debug' }));
app.use(cors())
app.use(cookieParser());
app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, 'views'))
app.use(layouts)
app.use(Express.static(__dirname + '/public'))
app.use(Express.json());
app.use(Express.urlencoded({ extended: false }));


const sess: session.SessionOptions = {
  secret: "secret_key",
  resave: false,
  saveUninitialized: false,
  store: new RedisStore({
    client: redisClient,
  }),
  cookie: {
    httpOnly: true,
    secure: (process.env.NODE_ENV === "production") ? true: false,
    maxAge: 1000 * 60 * 30,
    sameSite: "lax",
  },
};
if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}
app.use(session(sess));

app.use('/api', router)

export default app;
