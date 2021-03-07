import jwt from 'jsonwebtoken';
const verify = jwt.verify()
import envConfig from '../../config/env.config.js'
const secret = envConfig.jwt_secret
import crypto from 'crypto';
const createHmac = crypto.createHmac()

export function verifyRefreshBodyField(req, res, next) {
    if (req.body && req.body.refresh_token) {
        return next();
    } else {
        return res.status(400).send({error: 'need to pass refresh_token field'});
    }
}

export function validRefreshNeeded(req, res, next) {
    let b = Buffer.from(req.body.refresh_token, 'base64');
    let refresh_token = b.toString();
    let hash = createHmac('sha512', req.jwt.refreshKey).update(req.jwt.userId + secret).digest("base64");
    if (hash === refresh_token) {
        req.body = req.jwt;
        return next();
    } else {
        return res.status(400).send({error: 'Invalid refresh token'});
    }
}

export function validJWTNeeded(req, res, next) {
    if (req.headers['authorization']) {
        try {
            req.jwt = verify(req.headers['authorization'], secret);
            return next();
        } catch (err) {
            return res.status(403).send();
        }
    } else {
        return res.status(401).send();
    }
}