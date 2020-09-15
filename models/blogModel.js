'use strict';
var mongoose = require('mongoose');
const User = require('./userModel');

var BlogSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    username: {
        type: String,
        required: 'Username is required field'
    },
    blog_heading: {
        type: String,
        required: "Blog heading is required field",
        maxlength: 50
    },
    blog_description: {
        type: String,
        required: "Blog description is required field"
    }
})

module.exports = mongoose.model('Blogs', BlogSchema);