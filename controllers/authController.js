const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.create = async function (req, res) {
    if (await User.findOne({ username: req.body.username })) {
        res.send({message: 'Username "' + req.body.username + '" is already taken'});
    }
    const user = new User(req.body);
    // hash password
    if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 10);
    }
    user.save()
    .then(data => res.json({ status: 200, data, message: 'User created successfully' }))
    .catch(error => res.send(error))
}

exports.update = async function(req, res) {
    let [scheme, token] = req.headers.authorization.split(' ')
    let decode = jwt.decode(token)
    const user = await User.findById(decode.userId);

    // validate
    if (!user) res.send({status: 200, message: 'User not found', error_status: 1});
    if (user.username !== req.body.username && await User.findOne({ username: req.body.username })) {
        res.send({
            status: 200,
            message: 'Username "' + req.body.username + '" is already taken',
            error_status: 1
        });
    }

    // hash password if it was entered
    if (req.body.password) {
        req.body.password = bcrypt.hashSync(req.body.password, 10);
    }

    // copy userParam properties to user
    Object.assign(user, req.body);

    user.save()
    .then(data => res.json({status: 200, data, error_status: 0}))
    .catch(error => res.send(error));
}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}

exports.authenticate = function(req, res) {
    User.findOne({ username: req.body.username })
    .then(user => {
        if(bcrypt.compareSync(req.body.password, user.password)) {
            const token = jwt.sign({ userId: user.id }, 'secret', { expiresIn: '1d' });
            return res.json({status: 200, data: user, token})
        } else {
            return res.send({message: 'Incorrect password'})
        }
    })
    .catch(error => res.send(error));
}

exports.getAll = function(req, res) {
    User.find()
    .then(data => res.json({status: 200, data, count: data.length }))
    .catch(error => res.send(error))
}

exports.getById = function(req, res) {
    User.findById(req.params.id)
    .then(data => res.json({status: 200, data}))
    .catch(error => res.send(error))
}