const express = require('express');
const router = express.Router();
const blogList = require('../controllers/blogController');

/* GET users listing. */
router.get('/:id', blogList.get_blog_data);
router.put('/:id', blogList.update_blog_data);

module.exports = router;