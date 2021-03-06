const modelsUsers = require('../models/users');
const crypto = require('crypto');
const randomBytes = crypto.randomBytes();
const createHmac = crypto.createHmac();

exports.insert = (req, res) => {
    let salt = randomBytes(16).toString('base64');
    let hash = createHmac('sha512', salt).update(req.body.password).digest("base64");
    req.body.password = salt + "$" + hash;
    req.body.permissionLevel = 1;
    modelsUsers.createUser(req.body)
        .then((result) => {
            res.status(201).send({id: result._id});
        });
}

exports.list = (req, res) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    modelsUsers.list(limit, page)
        .then((result) => {
            res.status(200).send(result);
        })
}

exports.getById = (req, res) => {
    modelsUsers.findById(req.params.userId)
        .then((result) => {
            res.status(200).send(result);
        });
}

exports.patchById = (req, res) => {
    if (req.body.password) {
        let salt = randomBytes(16).toString('base64');
        let hash = createHmac('sha512', salt).update(req.body.password).digest("base64");
        req.body.password = salt + "$" + hash;
    }

    modelsUsers.patchUser(req.params.userId, req.body)
        .then((result) => {
            res.status(204).send({});
        });

}

exports.removeById = (req, res) => {
    modelsUsers.removeById(req.params.userId)
        .then((result)=>{
            res.status(204).send({});
        });
}