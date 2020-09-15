const Blog = require('../models/blogModel')

exports.get_all_blog = function(req, res) {
    Blog.find()
    .then(data => res.json({status: 200, data, count: data.length})
    ).catch(error => res.send(error))
}

exports.create_a_blog = function(req, res) {
    console.log('request is', req.body)
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