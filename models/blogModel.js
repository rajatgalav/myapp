'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BlogSchema = new Schema({
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