'use strict';
var mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    username: {
        type: String,
        required: 'Username is required field',
        unique: true
    },
    email: {
        type: String,
        validate: {
            validator: function(v) {
              return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(v);
            },
            message: props => `${props.value} is not a valid email adress!`
        },
        required: "Email is required field",
        unique: true
    },
    password: {
        type: String,
        required: "Password is required field"
    }
})

module.exports = mongoose.model('Users', Schema);