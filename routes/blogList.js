const express = require('express');
const router = express.Router();
const blogList = require('../controllers/blogController');

/* GET users listing. */
router.get('/', blogList.get_all_blog);
router.delete('/', blogList.delete_blog);

module.exports = router;