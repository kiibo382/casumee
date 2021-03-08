import envConfig from '../config/env.config.js'
const secret = envConfig['jwt_secret']
import jsonwebtoken from 'jsonwebtoken';
import crypto from 'crypto';

export function login(req, res) {
    try {
        let refreshId = req.body.userId + secret;
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512', salt).update(refreshId).digest("base64");
        req.body.refreshKey = salt;
        let token = jsonwebtoken.sign(req.body, secret);
        let b = Buffer.from(hash);
        let refresh_token = b.toString('base64');
        res.status(201).send({ accessToken: token, refreshToken: refresh_token });
    } catch (err) {
        res.status(500).send({ errors: err });
    }
}

export function refresh_token(req, res) {
    try {
        req.body = req.jwt;
        let token = jsonwebtoken.sign(req.body, secret);
        res.status(201).send({ id: token });
    } catch (err) {
        res.status(500).send({ errors: err });
    }
}