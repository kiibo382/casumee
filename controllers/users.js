import { createUser, list, findById, putUser, removeUser } from '../models/users.js';
import crypto from 'crypto';
const randomBytes = crypto.randomBytes;
const createHmac = crypto.createHmac;

export function insert(req, res) {
    let salt = randomBytes(16).toString('base64');
    let hash = createHmac('sha512', salt).update(req.body.password).digest("base64");
    req.body.password = salt + "$" + hash;
    req.body.permissionLevel = 1;
    createUser(req.body)
        .then((result) => {
            res.status(201).send({id: result._id});
        });
}

export function getList(req, res) {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    list(limit, page)
        .then((result) => {
            res.status(200).send(result);
        })
}

export function getById(req, res) {
    findById(req.params.userId)
        .then((result) => {
            res.status(200).send(result);
        });
}

export function putById(req, res) {
    if (req.body.password) {
        let salt = randomBytes(16).toString('base64');
        let hash = createHmac('sha512', salt).update(req.body.password).digest("base64");
        req.body.password = salt + "$" + hash;
    }

    putUser(req.params.userId, req.body)
        .then((result) => {
            res.status(204).send({});
        });

}

export function removeById(req, res) {
    console.log(req.params.userId)
    removeUser(req.params.userId)
        .then((result)=>{
            res.status(204).send({});
        });
}