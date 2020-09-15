const express = require('express');
const router = express.Router();
const users = require('../controllers/authController');

/* GET users listing. */
router.post('/register', users.create);
router.get('/', users.getAll);
router.get('/:id', users.getById);
router.post('/login', users.authenticate);
router.put('/update', users.update);

module.exports = router;
