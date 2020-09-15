const lodash = require('lodash');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Blog = require('../models/blogModel');

exports.get_all_blog = function(req, res) {
    Blog.find()
    .then(data => res.json({status: 200, data, count: data.length})
    ).catch(error => res.send(error))
}

exports.create_a_blog = async function(req, res) {
    if(lodash.isEmpty(req.headers.authorization)) res.send({status: 200, error_status: 1, message: 'Pass token in headers'})
    let [scheme, token] = req.headers.authorization.split(' ')
    let decode = jwt.decode(token)
    
    const user = await User.findById(decode.userId);

    console.log('user is', user)
    req.body.userId = decode.userId
    req.body.username = user.username
    let new_blog = new Blog(req.body);
    new_blog.save(function(err, blog) {
      if (err)
        res.send(err);
      res.json(blog);
    });
};

exports.get_blog_data = function(req, res) {
    Blog.findById(req.params.id)
    .then(data => {
        if(data != null)
            res.send({ status: 200, data, message: 'data found successfully' })
        else
            res.send({ status: 200, data, message: 'data not found' })
    })
    .catch(error => res.send(error))
}

exports.update_blog_data = function(req, res) {
    Blog.findByIdAndUpdate(
        req.params.id,
        { blog_heading: req.body.blog_heading, blog_description: req.body.blog_description },
        {new: true}
    )
    .then(data => {
        res.send({ status: 200, message: 'data updated successfully' })
    })
    .catch(error => res.send(error))
}

exports.delete_blog = function(req, res) {
    Blog.findOneAndDelete(req.params.id)
    .then(data => {
        console.log('res is', data)
        res.send({status: 200, message: 'deleted succesfully'})})
    .catch(error => res.send(error));

}